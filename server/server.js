const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require('cors');


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

const client = new MongoClient(uri);

console.log('Connecting to MongoDB');
client.connect()
  .then(() => {

    // display the current time so that we know
    const currentDateTime = new Date().toLocaleString();
    console.log(`Connected to MongoDB at ${currentDateTime}`);

    router.post('/signin', async (req, res) => {
      try {
        console.log("/signin called");
        const db = client.db(dbName);


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
        const db = client.db(dbName);

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

    router.get("/profile", async (req, res) => {
      try {
        if (req.headers.authorization) {

          try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Auth token is valid');
            const db = client.db(dbName);
            const collection = db.collection(USER_PROFILES_COLLECTION);
           
            // lookup the record in MongoDB using the id decoded from the token
            const profile = await collection.findOne(
              { _id: ObjectId.createFromHexString(decoded.id) },
              { projection: { password: 0 } // This causes all fields to be retrieved except the
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

    router.post("/updateprofile", async (req, res) => {
      try {
        if (req.headers.authorization) {
          try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Auth token is valid');
            const { firstName, lastName, phone, email, location, photo, resume } = req.body;
            // Access the database
            const db = client.db(dbName);

            // Access the collection (replace USER_PROFILES_COLLECTION with your collection name)
            const collection = db.collection(USER_PROFILES_COLLECTION);

            const updatedProfileData = {
              firstName,
              lastName,
              phone,
              email,
              location,
              photo,
              resume
            };

            const result = await collection.updateOne(
              // look up the existing record we are updating using the _id of the record
              { _id: ObjectId.createFromHexString(decoded.id) },
              { $set: updatedProfileData }
            );
            //chick if we got back our record
            if (result.matchedCount === 0) {
              res.status(404).json({ error: "User profile not found"});
            }else{
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
