const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require('cors');

const multer = require("multer");

const router = express.Router();
console.log('Startup...');

// this will load config properties, keys, etc. from .env file
dotenv.config();

// Library to parse JSON whenever it is "POSTED" to an API
router.use(express.json());
router.use(cors());

// Connection URI
const uri = process.env.MONGODB_URI;

// MongoDB database Name
const dbName = 'mydb';

const app = express();

const PORT = process.env.PORT;
const USER_PROFILES_COLLECTION = 'users';
const JOBS_COLLECTION = 'Jobs';
const APPLICATIONS_COLLECTION = 'applications';

const client = new MongoClient(uri);

console.log('Connecting to MongoDB');
client.connect()
  .then(() => {
    const db = client.db(dbName);
    // display the current time so that we know
    const currentDateTime = new Date().toLocaleString();
    console.log(`Connected to MongoDB at ${currentDateTime}`);

    router.post('/apply', async (req, res) => {
      //console.log("/apply was called");
      const applications_collection = db.collection(APPLICATIONS_COLLECTION);

      // retrieve job._id from req.body
      const { _id } = req.body;

      // decode user._id
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const application_info = {
        job_id: ObjectId.createFromHexString(_id),
        user_id: ObjectId.createFromHexString(decoded.id),
        date_applied: new Date(),
        status: 'Pending',
      };

      // date_applied, status, 
      // j_coll = obtain reference to Applications collection
      // does the job._id , user._id combo exists
      try {
        // Check if the combination of job_id and user_id already exists
        const existingApplication = await applications_collection.findOne({
          job_id: ObjectId.createFromHexString(_id),
          user_id: ObjectId.createFromHexString(decoded.id)
        });

        if (existingApplication) {
          //i am using a custom error code. We will handle this particular code in the UI
          return res.status(407).json({ error: 'You’ve already applied for this job. Check your application status in "Your Jobs".' });
        }

        // otherwise proceed to insert the combination
        applications_collection.insertOne(application_info);
        res.status(200).json({
          job_id: _id,
          user_id: decoded.id
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save job application ' + "Job id " + _id + " User " + decoded.id });
      }
    });

    router.post('/signin', async (req, res) => {
      try {
        console.log("/signin called");



        const collection = db.collection(USER_PROFILES_COLLECTION);

        const { email, password } = req.body;

        const user = await collection.findOne({ email }); // it without matching the password since it is hashed in db

        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password); //now let's see if the hashes match
          if (passwordMatch) { // if the two hashed passwords match, then set the authentication cookie and reprt success

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "1h",
            });
            res.status(200).json({ token, message: 'Login success' });
          } else {
            res.status(401).json({ message: 'Invalid password.' });
          }
        } else {
          res.status(401).json({ message: 'No matching user found.' });
        }

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve users' });
      }
    });

    router.post("/signup", async (req, res) => {
      try {
        if (!req.body || !req.body.full_name) {
          return res.status(400).send({ error: 'Invalid request body' });
        }
        const { full_name, phone, email, password } = req.body;
        // Access the database


        // Access the collection (replace USER_PROFILES_COLLECTION with your collection name)
        const collection = db.collection(USER_PROFILES_COLLECTION);

        const existingUser = await collection.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ error: "Email already registered" });
        }

        // test
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          full_name,
          phone,
          email,
          password: hashedPassword,
        };


        await collection.insertOne(newUser);

        res.status(201).json({ message: "User created successfully" });
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: `Error creating user. ${error}` });
      }
    });

    router.get("/applications", async (req, res) => {
      try {
        if (req.headers.authorization) {
          const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          console.log('Auth token is valid');
          console.log("in applications list");

          const applications_collection = db.collection(APPLICATIONS_COLLECTION);

          try {

            const applicationsWithJobDetails = await applications_collection.aggregate([
              {
                $match: { // match all applications for this user id
                  user_id: ObjectId.createFromHexString(decoded.id)
                }
              },
              {
                $lookup: { // equivalent to JOIN in RDBMS
                  from: 'Jobs',
                  localField: 'job_id',
                  foreignField: '_id',
                  as: 'jobDetails' // pick any name, used below in $unwind 
                }
              },
              { $unwind: '$jobDetails' } // since we are expecting it to match 0 or 1 instance, this prevents it from being turned into an array 
            ]).toArray();

            res.status(200).json(applicationsWithJobDetails);

          } catch (error) {
            console.log(`Error in /applications. ${error}`);
            res.status(500).json({ error: `Error searching applications. ${error}` });
          }
        } else {
          res.status(401).json({ message: 'User not authenticated' });
        }
      } catch (error) {
        console.log(`Error in /applications. ${error}`);
        res.status(500).json({ error: `Error searching applications. ${error}` });
      }
    });

    router.get("/jobs", async (req, res) => {
      try {
        if (req.headers.authorization) {
          const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          console.log('Auth token is valid');
        }
        console.log("in job search");

        const collection = db.collection(JOBS_COLLECTION);
        query = {
          "$or": [
            { "title": { "$regex": req.query.q, "$options": "i" } },
            { "jobDescription": { "$regex": req.query.q, "$options": "i" } },
            { "skills": { "$regex": req.query.q, "$options": "i" } },
            { "locations": { "$regex": req.query.q, "$options": "i" } },
            { "benefits": { "$regex": req.query.q, "$options": "i" } },
            { "schedule": { "$regex": req.query.q, "$options": "i" } },
            { "salary": { "$regex": req.query.q, "$options": "i" } },
          ]
        }
        // lookup the record in MongoDB using the id decoded from the token
        //console.log(query);
        const jobs = await collection.find(query).toArray();

        //console.log(jobs);

        res.status(200).json(jobs);
      } catch (error) {
        console.log(`Error in /jobs. ${error}`);
        res.status(500).json({ error: `Error searching jobs. ${error}` });
      }
    });

    router.get("/profile", async (req, res) => {
      try {
        if (req.headers.authorization) {

          try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Auth token is valid');

            const collection = db.collection(USER_PROFILES_COLLECTION);

            // lookup the record in MongoDB using the id decoded from the token
            const profile = await collection.findOne(
              { _id: ObjectId.createFromHexString(decoded.id) },
              {
                projection: { password: 0 } // This causes all fields to be retrieved except the
                // password field to be removed from the response
              });

            if (profile) {
              res.status(200).json(profile);
            } else {
              res.status(404).json({ message: 'No matching record found. Check your access token.' });
            }

          } catch (err) {
            if (err.name === 'TokenExpiredError') {
              console.log('Token has expired');
              res.status(401).json({ message: 'Token has expired' });
            } else {
              console.log('Token is not valid:', err.message);
              res.status(401).json({ message: 'Invalid token' });
            }
          }

        } else {
          res.status(401).json({ error: "Unauthorized", message: "Check your access token." });
        }

      } catch (error) {
        console.log(`Error in /profile. ${error}`);
        res.status(500).json({ error: `Error fetching user profile. ${error}` });
      }

    });


    const storage = multer.memoryStorage();

    const upload = multer({ storage: storage });

    router.post("/updateprofile", upload.fields([{ name: "photo" }, { name: "resume" }]), async (req, res) => {
      try {
        if (req.headers.authorization) {
          try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Auth token is valid');
            const { firstName, lastName, phone, email, location } = req.body;
            // Access the database


            // Access the collection (replace USER_PROFILES_COLLECTION with your collection name)
            const collection = db.collection(USER_PROFILES_COLLECTION);

            let resumeFile = null;
            let encodedPhoto = null;

            //console.log("Uploaded files:", req.files);
            if (req.files) {
              if (req.files["photo"]) {
                let photo = req.files["photo"][0];
                if (photo) {
                  const base64Encoded = photo.buffer.toString('base64');
                  encodedPhoto = `data:${photo.mimetype};base64,${base64Encoded}`;
                }
              }

              if (req.files["resume"]) {
                let resume = req.files["resume"][0];
                if (resume) {
                  resumeFile = req.files["resume"][0];
                }
              }
            }

            const updatedProfileData = {
              firstName,
              lastName,
              phone,
              email,
              location,
              ...(encodedPhoto && { encodedPhoto }), // elipses - include it only if it is not null
              ...(resumeFile && { resumeFile }) // elipses - include it only if it is not null
            };

            const result = await collection.updateOne(
              // look up the existing record we are updating using the _id of the record
              { _id: ObjectId.createFromHexString(decoded.id) },
              { $set: updatedProfileData }
            );
            //chick if we got back our record
            if (result.matchedCount === 0) {
              res.status(404).json({ error: "User profile not found" });
            } else {
              res.status(200).json({ message: "Profile updated successfully" });
            }

          } catch (err) {
            if (err.name === 'TokenExpiredError') {
              console.log('Token has expired');
              res.status(401).json({ message: 'Token has expired' });
            } else {
              console.log('Token is not valid:', err.message);
              res.status(401).json({ message: 'Invalid token' });
            }
          }

        }
        else {
          res.status(401).json({ error: "Unauthorized", message: "Check your access token." });
        }
      } catch (error) {
        console.log(error);
        res.status(404).json({ error: `Error updating user profile. ${error}` });
      }
    });

    router.get('/logout', async (req, res) => {
      try {
        console.log("/logout called");
        // Send the users as a JSON response
        res.cookie('nextstep_auth', '', { expires: new Date(0), httpOnly: true });
        res.json({ message: "You've been logged out" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve users' });
      }
    });

    // Start the server
    app.use(router);

    app.listen(PORT, function (err) {
      if (err) console.log(err);
      console.log("Server listening on PORT", PORT);
    });

  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
