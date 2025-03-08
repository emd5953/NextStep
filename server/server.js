<<<<<<< HEAD
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
=======
const dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config();

const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const { OAuth2Client } = require("google-auth-library");
const { sendVerificationCode, verifyCode } = require("./middleware/smsAuth");

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Log environment variables (excluding sensitive data)
console.log("Environment check:", {
  port: process.env.PORT,
  twilioConfigured:
    !!process.env.TWILIO_ACCOUNT_SID &&
    !!process.env.TWILIO_AUTH_TOKEN &&
    !!process.env.TWILIO_PHONE_NUMBER,
  mongoConfigured: !!process.env.MONGODB_URI,
  googleConfigured: !!process.env.GOOGLE_CLIENT_ID,
});

console.log("Startup...");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f

// Connection URI
const uri = process.env.MONGODB_URI;

// MongoDB database Name
<<<<<<< HEAD
const dbName = 'mydb';

const app = express();

const PORT = process.env.PORT;
const USER_PROFILES_COLLECTION = 'users';
const JOBS_COLLECTION = 'Jobs';
const APPLICATIONS_COLLECTION = 'applications';

const client = new MongoClient(uri);

console.log('Connecting to MongoDB');
client.connect()
=======
const dbName = "mydb";

const PORT = process.env.PORT;
const USER_PROFILES_COLLECTION = "users";
const JOBS_COLLECTION = "Jobs";
const APPLICATIONS_COLLECTION = "applications";

const client = new MongoClient(uri);

console.log("Connecting to MongoDB");
client
  .connect()
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
  .then(() => {
    const db = client.db(dbName);
    // display the current time so that we know
    const currentDateTime = new Date().toLocaleString();
    console.log(`Connected to MongoDB at ${currentDateTime}`);

<<<<<<< HEAD
    router.post('/apply', async (req, res) => {
=======
    app.post("/apply", async (req, res) => {
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
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
<<<<<<< HEAD
        status: 'Pending',
      };

      // date_applied, status, 
=======
        status: "Pending",
      };

      // date_applied, status,
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
      // j_coll = obtain reference to Applications collection
      // does the job._id , user._id combo exists
      try {
        // Check if the combination of job_id and user_id already exists
        const existingApplication = await applications_collection.findOne({
          job_id: ObjectId.createFromHexString(_id),
<<<<<<< HEAD
          user_id: ObjectId.createFromHexString(decoded.id)
=======
          user_id: ObjectId.createFromHexString(decoded.id),
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
        });

        if (existingApplication) {
          //i am using a custom error code. We will handle this particular code in the UI
<<<<<<< HEAD
          return res.status(407).json({ error: 'You’ve already applied for this job. Check your application status in "Your Jobs".' });
=======
          return res.status(407).json({
            error:
              "You've already applied for this job. Check your application status in 'Your Jobs'.",
          });
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
        }

        // otherwise proceed to insert the combination
        applications_collection.insertOne(application_info);
        res.status(200).json({
          job_id: _id,
<<<<<<< HEAD
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

            const token = jwt.sign({ id: user._id, isEmployer: user.employerFlag }, process.env.JWT_SECRET, {
              expiresIn: "1h",
            });
            res.status(200).json({ token, message: 'Login success', isEmployer: user.employerFlag });
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
        const { full_name, phone, email, password, employerFlag } = req.body;
        // Access the database


        // Access the collection (replace USER_PROFILES_COLLECTION with your collection name)
        const collection = db.collection(USER_PROFILES_COLLECTION);

        const existingUser = await collection.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ error: "Email already registered" });
        }

        
=======
          user_id: decoded.id,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          error:
            "Failed to save job application " +
            "Job id " +
            _id +
            " User " +
            decoded.id,
        });
      }
    });

    app.post("/send-verification", async (req, res) => {
      try {
        const { phoneNumber } = req.body;
        const sent = await sendVerificationCode(phoneNumber);
        if (sent) {
          res
            .status(200)
            .json({ message: "Verification code sent successfully" });
        } else {
          res.status(500).json({ error: "Failed to send verification code" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    });

    app.post("/verify-code", async (req, res) => {
      try {
        const { phoneNumber, code } = req.body;
        const result = verifyCode(phoneNumber, code);
        if (result.valid) {
          res.status(200).json({ message: result.message });
        } else {
          res.status(400).json({ error: result.message });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    });

    app.post("/signup", async (req, res) => {
      try {
        if (!req.body || !req.body.full_name) {
          return res.status(400).send({ error: "Invalid request body" });
        }
        const {
          full_name,
          phone,
          email,
          password,
          employerFlag,
          verificationCode,
        } = req.body;

        // Verify the phone number first
        const verification = verifyCode(phone, verificationCode);
        if (!verification.valid) {
          return res.status(400).json({ error: verification.message });
        }

        const collection = db.collection(USER_PROFILES_COLLECTION);
        const existingUser = await collection.findOne({
          $or: [{ email }, { phone }],
        });

        if (existingUser) {
          return res.status(400).json({
            error:
              existingUser.email === email
                ? "Email already registered"
                : "Phone number already registered",
          });
        }

>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          full_name,
          phone,
          email,
          password: hashedPassword,
<<<<<<< HEAD
          employerFlag: employerFlag
        };


        await collection.insertOne(newUser);

=======
          employerFlag: employerFlag,
          phoneVerified: true,
        };

        await collection.insertOne(newUser);
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
        res.status(201).json({ message: "User created successfully" });
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: `Error creating user. ${error}` });
      }
    });

<<<<<<< HEAD
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
=======
    app.post("/signin", async (req, res) => {
      try {
        console.log("/signin called");
        const collection = db.collection(USER_PROFILES_COLLECTION);
        const { email, password, phone, verificationCode } = req.body;

        // Find user by email or phone
        const user = await collection.findOne({
          $or: [{ email }, { phone }],
        });

        if (!user) {
          return res.status(401).json({ message: "No matching user found." });
        }

        // If signing in with phone, verify the code
        if (phone && verificationCode) {
          const verification = verifyCode(phone, verificationCode);
          if (!verification.valid) {
            return res.status(401).json({ message: verification.message });
          }
        } else {
          // If signing in with email, verify password
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password." });
          }
        }

        const token = jwt.sign(
          { id: user._id, isEmployer: user.employerFlag },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(200).json({
          token,
          message: "Login success",
          isEmployer: user.employerFlag,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve users" });
      }
    });

    app.get("/applications", async (req, res) => {
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
      try {
        if (req.headers.authorization) {
          const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
<<<<<<< HEAD
          console.log('Auth token is valid');
=======
          console.log("Auth token is valid");
          console.log("in applications list");

          const applications_collection = db.collection(
            APPLICATIONS_COLLECTION
          );

          try {
            const applicationsWithJobDetails = await applications_collection
              .aggregate([
                {
                  $match: {
                    // match all applications for this user id
                    user_id: ObjectId.createFromHexString(decoded.id),
                  },
                },
                {
                  $lookup: {
                    // equivalent to JOIN in RDBMS
                    from: "Jobs",
                    localField: "job_id",
                    foreignField: "_id",
                    as: "jobDetails", // pick any name, used below in $unwind
                  },
                },
                { $unwind: "$jobDetails" }, // since we are expecting it to match 0 or 1 instance, this prevents it from being turned into an array
              ])
              .toArray();

            res.status(200).json(applicationsWithJobDetails);
          } catch (error) {
            console.log(`Error in /applications. ${error}`);
            res
              .status(500)
              .json({ error: `Error searching applications. ${error}` });
          }
        } else {
          res.status(401).json({ message: "User not authenticated" });
        }
      } catch (error) {
        console.log(`Error in /applications. ${error}`);
        res
          .status(500)
          .json({ error: `Error searching applications. ${error}` });
      }
    });

    app.get("/jobs", async (req, res) => {
      try {
        if (req.headers.authorization) {
          const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          console.log("Auth token is valid");
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
        }
        console.log("in job search");

        const collection = db.collection(JOBS_COLLECTION);
<<<<<<< HEAD
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
=======
        const query = {
          $or: [
            { title: { $regex: req.query.q, $options: "i" } },
            { jobDescription: { $regex: req.query.q, $options: "i" } },
            { skills: { $regex: req.query.q, $options: "i" } },
            { locations: { $regex: req.query.q, $options: "i" } },
            { benefits: { $regex: req.query.q, $options: "i" } },
            { schedule: { $regex: req.query.q, $options: "i" } },
            { salary: { $regex: req.query.q, $options: "i" } },
          ],
        };
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
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

<<<<<<< HEAD
    router.get("/profile", async (req, res) => {
      try {
        if (req.headers.authorization) {

          try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Auth token is valid');
=======
    app.get("/profile", async (req, res) => {
      try {
        if (req.headers.authorization) {
          try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Auth token is valid");
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f

            const collection = db.collection(USER_PROFILES_COLLECTION);

            // lookup the record in MongoDB using the id decoded from the token
            const profile = await collection.findOne(
              { _id: ObjectId.createFromHexString(decoded.id) },
              {
<<<<<<< HEAD
                projection: { password: 0 } // This causes all fields to be retrieved except the
                // password field to be removed from the response
              });
=======
                projection: { password: 0 }, // This causes all fields to be retrieved except the
                // password field to be removed from the response
              }
            );
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f

            if (profile) {
              res.status(200).json(profile);
            } else {
<<<<<<< HEAD
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


=======
              res.status(404).json({
                message: "No matching record found. Check your access token.",
              });
            }
          } catch (err) {
            if (err.name === "TokenExpiredError") {
              console.log("Token has expired");
              res.status(401).json({ message: "Token has expired" });
            } else {
              console.log("Token is not valid:", err.message);
              res.status(401).json({ message: "Invalid token" });
            }
          }
        } else {
          res.status(401).json({
            error: "Unauthorized",
            message: "Check your access token.",
          });
        }
      } catch (error) {
        console.log(`Error in /profile. ${error}`);
        res
          .status(500)
          .json({ error: `Error fetching user profile. ${error}` });
      }
    });

>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
    const storage = multer.memoryStorage();

    const upload = multer({ storage: storage });

<<<<<<< HEAD
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
=======
    app.post(
      "/updateprofile",
      upload.fields([{ name: "photo" }, { name: "resume" }]),
      async (req, res) => {
        try {
          if (req.headers.authorization) {
            try {
              const token = req.headers.authorization.split(" ")[1];
              const decoded = jwt.verify(token, process.env.JWT_SECRET);
              console.log("Auth token is valid");
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
                    const base64Encoded = photo.buffer.toString("base64");
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
                ...(resumeFile && { resumeFile }), // elipses - include it only if it is not null
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
                res
                  .status(200)
                  .json({ message: "Profile updated successfully" });
              }
            } catch (err) {
              if (err.name === "TokenExpiredError") {
                console.log("Token has expired");
                res.status(401).json({ message: "Token has expired" });
              } else {
                console.log("Token is not valid:", err.message);
                res.status(401).json({ message: "Invalid token" });
              }
            }
          } else {
            res.status(401).json({
              error: "Unauthorized",
              message: "Check your access token.",
            });
          }
        } catch (error) {
          console.log(error);
          res
            .status(404)
            .json({ error: `Error updating user profile. ${error}` });
        }
      }
    );

    app.get("/logout", async (req, res) => {
      try {
        console.log("/logout called");
        // Send the users as a JSON response
        res.cookie("nextstep_auth", "", {
          expires: new Date(0),
          httpOnly: true,
        });
        res.json({ message: "You've been logged out" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve users" });
      }
    });

    app.post("/auth/google", async (req, res) => {
      try {
        const { token } = req.body;
        const ticket = await googleClient.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name } = ticket.getPayload();
        const collection = db.collection(USER_PROFILES_COLLECTION);

        // Check if user exists
        let user = await collection.findOne({ email });

        if (!user) {
          // Create new user if doesn't exist
          const newUser = {
            full_name: name,
            email,
            employerFlag: false,
            emailVerified: true,
          };

          const result = await collection.insertOne(newUser);
          user = { ...newUser, _id: result.insertedId };
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
          { id: user._id, isEmployer: user.employerFlag },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(200).json({
          token: jwtToken,
          message: "Login success",
          isEmployer: user.employerFlag,
        });
      } catch (error) {
        console.error("Google authentication error:", error);
        res.status(401).json({ error: "Invalid Google token" });
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
      }
    });

    // Start the server
<<<<<<< HEAD
    app.use(router);

=======
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
    app.listen(PORT, function (err) {
      if (err) console.log(err);
      console.log("Server listening on PORT", PORT);
    });
<<<<<<< HEAD

  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
=======
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
>>>>>>> c385fae2c82551af2029c416a05994df92289c1f
  });
