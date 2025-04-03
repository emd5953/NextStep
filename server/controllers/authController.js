const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { ObjectId } = require("mongodb");

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Controller for handling authentication-related operations
 * @namespace authController
 */
const authController = {
  /**
   * Authenticates a user with email/password or phone verification
   * @async
   * @param {Object} req - Express request object
   * @param {Object} req.body - Request body
   * @param {string} req.body.email - User's email
   * @param {string} req.body.password - User's password
   * @param {string} [req.body.phone] - User's phone number (optional)
   * @param {string} [req.body.verificationCode] - Phone verification code (optional)
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JWT token and user info
   * @throws {Error} 401 if credentials are invalid
   * @throws {Error} 500 if server error occurs
   */
  signin: async (req, res) => {
    try {
      const collection = req.app.locals.db.collection("users");
      const { email, password, phone, verificationCode } = req.body;

      // Find user by email or phone
      const user = await collection.findOne({
        $or: [{ email }],
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
          return res.status(401).json({ message: "Invalid credentials" });
        }
      }

      // Generate JWT
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
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  },

  /**
   * Registers a new user with email/password or phone verification
   * @async
   * @param {Object} req - Express request object
   * @param {Object} req.body - Request body
   * @param {string} req.body.full_name - User's full name
   * @param {string} [req.body.phone] - User's phone number (optional)
   * @param {string} req.body.email - User's email
   * @param {string} req.body.password - User's password
   * @param {boolean} [req.body.employerFlag] - Whether user is an employer
   * @param {string} [req.body.verificationCode] - Phone verification code (optional)
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} Success message
   * @throws {Error} 400 if request body is invalid
   * @throws {Error} 409 if user already exists
   * @throws {Error} 500 if server error occurs
   */
  signup: async (req, res) => {
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

      // Verify the phone number if code is provided
      if (verificationCode) {
        const verification = verifyCode(phone, verificationCode);
        if (!verification.valid) {
          return res.status(400).json({ error: verification.message });
        }
      }

      const collection = req.app.locals.db.collection("users");

      // Check if user already exists by email or phone
      const existingUser = await collection.findOne({
        $or: [{ email }, { phone }],
      });

      if (existingUser) {
        return res.status(409).json({
          error:
            existingUser.email === email
              ? "Email already registered"
              : "Phone number already registered",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        full_name,
        phone,
        email,
        password: hashedPassword,
        employerFlag: employerFlag,
        phoneVerified: !!verificationCode,
      };

      await collection.insertOne(newUser);
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(400).json({ error: `Error creating user. ${error.message}` });
    }
  },

  /**
   * Authenticates a user using Google OAuth
   * @async
   * @param {Object} req - Express request object
   * @param {Object} req.body - Request body
   * @param {string} req.body.token - Google OAuth token
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JWT token and user info
   * @throws {Error} 401 if Google token is invalid
   * @throws {Error} 500 if server error occurs
   */
  googleAuth: async (req, res) => {
    try {
      const { token } = req.body;
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email, name, given_name, family_name, picture } = ticket.getPayload();
      const collection = req.app.locals.db.collection("users");

      // Check if user exists
      let user = await collection.findOne({ email });

      if (!user) {
        // Create new user if doesn't exist in MongoDB
        const newUser = {
          full_name: name,
          lastName: family_name,
          firstName: given_name,
          pictureUrl: picture,
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
      res.status(401).json({ error: "Invalid Google token" });
    }
  },

  /**
   * Logs out the current user by clearing the auth cookie
   * @async
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} Success message
   * @throws {Error} 500 if server error occurs
   */
  logout: async (req, res) => {
    try {
      res.cookie("nextstep_auth", "", { expires: new Date(0), httpOnly: true });
      res.json({ message: "You've been logged out" });
    } catch (err) {
      res.status(500).json({ error: "Failed to logout" });
    }
  }
};

module.exports = authController; 