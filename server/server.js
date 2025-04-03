/**
 * Main server file for the Next-step application
 * @module server
 * @requires dotenv
 * @requires express
 * @requires mongodb
 * @requires cors
 * @requires bcryptjs
 * @requires jsonwebtoken
 * @requires multer
 * @requires google-auth-library
 */

require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { OAuth2Client } = require("google-auth-library");

// Import controllers
const authController = require("./controllers/authController");
const jobsController = require("./controllers/jobsController");
const applicationsController = require("./controllers/applicationsController");
const messagesController = require("./controllers/messagesController");
const { profileController, upload } = require("./controllers/profileController");

// Import middleware
const { verifyToken } = require("./middleware/auth");

/**
 * Express application instance
 * @type {express.Application}
 */
const app = express();

// Log key environment variables (excluding sensitive data)
console.log("Environment check:", {
  port: process.env.PORT,
  twilioConfigured:
    !!process.env.TWILIO_ACCOUNT_SID &&
    !!process.env.TWILIO_AUTH_TOKEN &&
    !!process.env.TWILIO_PHONE_NUMBER,
  mongoConfigured: !!process.env.MONGODB_URI,
  googleConfigured: !!process.env.GOOGLE_CLIENT_ID,
  env: process.env.NODE_ENV,
});

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const uri = process.env.MONGODB_URI;           // e.g. "mongodb+srv://..."
const dbName = process.env.NODE_ENV === 'test' ? "mydb_test" : "mydb";                         // or process.env.DB_NAME
const client = new MongoClient(uri);
const PORT = process.env.PORT || 4000;

/**
 * Main entry point for the API server
 */
client
  .connect()
  .then(() => {
    const db = client.db(dbName);
    app.locals.db = db; // Make db available to all routes

    /******************************************
     *        ROUTES DEFINITION START         *
     ******************************************/

    /* ------------------
       Tracks Apply(right-swipe), Skip, and Ignore Jobs
       mode: 1 for apply, 2 for skip, 3 for ignore
    ------------------ */
    // define constants for the swipe modes
    const APPLY = 1;
    const IGNORE = 2;

    app.post("/jobsTracker", verifyToken, applicationsController.trackApplication);

    /* ------------------
       Sign In
       (Email+Password or Phone+Verification)
    ------------------ */
    app.post("/signin", authController.signin);

    /* ------------------
       Sign Up (Phone verification optional)
    ------------------ */
    app.post("/signup", authController.signup);

    /* ------------------
       Get Applications (for logged-in user)
    ------------------ */
    app.get("/applications", verifyToken, applicationsController.getUserApplications);

    /* ------------------
       Get Single Job by ID
    ------------------ */
    app.get("/jobs/:jobId", jobsController.getJobById);

    /* ------------------
       Browse Jobs
    ------------------ */
    app.get("/jobs", jobsController.getAllJobs);

    /* ------------------
       Create New Job Posting
    ------------------ */
    app.post("/jobs", verifyToken, jobsController.createJob);

    /* ------------------
      Jobs to show in the homepage
    ------------------ */
    app.get("/retrieveJobsForHomepage", jobsController.getHomepageJobs);

    /* ------------------
       Get Profile (for logged-in user)
    ------------------ */
    app.get("/profile", verifyToken, profileController.getProfile);

    /* ------------------
       Update Profile (for logged-in user)
    ------------------ */
    app.post("/updateprofile", verifyToken, upload.fields([{ name: "photo" }, { name: "resume" }]), profileController.updateProfile);

    /* ------------------
       Logout
    ------------------ */
    app.get("/logout", authController.logout);

    /* ------------------
       Google OAuth
    ------------------ */
    app.post("/auth/google", authController.googleAuth);

    /* ------------------
       Get All Users (for messenger)
    ------------------ */
    app.get("/users", verifyToken, profileController.getAllUsers);

    /* ------------------
       Get Messages
    ------------------ */
    app.get("/messages", verifyToken, messagesController.getMessages);

    /* ------------------
       Mark Messages as Read
    ------------------ */
    app.put("/messages/read/:contactId", verifyToken, messagesController.markMessagesAsRead);

    /* ------------------
       Send Message
    ------------------ */
    app.post("/messages", verifyToken, messagesController.sendMessage);

    /* ------------------
       Get Recent Contacts
    ------------------ */
    app.get("/myRecentContacts", verifyToken, messagesController.getRecentContacts);

    /* ------------------
       Get Employer's Applications with Details
    ------------------ */
    app.get("/employer/applications", verifyToken, applicationsController.getEmployerApplications);

    /* ------------------
       Update Application Status
    ------------------ */
    app.put("/employer/applications/:applicationId", verifyToken, applicationsController.updateApplicationStatus);

    /* ------------------
       Get Application Details
    ------------------ */
    app.get("/employer/applications/:applicationId", verifyToken, applicationsController.getApplicationDetails);

    app.get("/userProfile/:userId", profileController.getUserProfile);

    /* ------------------
       Update Job Posting
    ------------------ */
    app.put("/employer/jobs/:jobId", verifyToken, jobsController.updateJob);

    /* ------------------
       Delete Job Posting
    ------------------ */
    app.delete("/employer/jobs/:jobId", verifyToken, jobsController.deleteJob);

    /* ------------------
       Search Employer's Job Postings
    ------------------ */
    app.get("/employer/jobs/search", verifyToken, jobsController.searchEmployerJobs);

    /******************************************
     *         ROUTES DEFINITION END          *
     ******************************************/

    // Start the server only if not in test environment
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, (err) => {
        if (err) console.log("Error starting server:", err);
        console.log(`Server listening on PORT ${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = app;
