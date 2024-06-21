import { connectDB } from "../config/db.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const pool = await connectDB();
      const request = pool.request();
      const userQuery = `
        SELECT UserID, Password
        FROM Users
        WHERE Email = @userEmail
      `;
      request.input('userEmail', email);
      const userResult = await request.query(userQuery);
      const user = userResult.recordset[0];
      if (!user) {
        return res.json({ success: false, message: "User doesn't exist." });
      }
      const storedPassword = user.Password;
      const isMatch = await bcrypt.compare(password, storedPassword);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid credentials" });
      }
      
      const token = generateAccessToken(user.UserID); // Changed to 'UserID' from 'id'
      res.json({ success: true,user, token}); // Changed 'accessToken' to 'token'
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error" });
    }
  };
  
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
      const pool = await connectDB();
      const request = pool.request();
      const existsQuery = `
        SELECT *
        FROM Users
        WHERE Email = @checkEmail
      `;
      request.input('checkEmail', email);
      const existsResult = await request.query(existsQuery);
      const exists = existsResult.recordset[0];
      if (exists) {
        return res.json({ success: false, message: "User already exists." });
      }
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email." });
      }
      if (password.length < 8) {
        return res.json({ success: false, message: "Please enter a strong password." });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const insertUserQuery = `
        INSERT INTO Users (Name, Email, Password)
        VALUES (@name, @userEmail, @userPassword)
      `;
      request.input('name', name);
      request.input('userEmail', email);
      request.input('userPassword', hashedPassword);
      await request.query(insertUserQuery);
      const userQuery = `
        SELECT UserID
        FROM Users
        WHERE Email = @userEmail
      `;
      const userResult = await request.query(userQuery);
      const user = userResult.recordset[0];
      const token = generateAccessToken(user.UserID); // Changed to 'UserID' from 'id'
      res.json({ success: true,name,email,password, token}); // Changed 'accessToken' to 'token'
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error" });
    }
  };

  const getUserProfile = async (req, res) => {
    const userId = req.body.userId; // Assuming you're sending userId in the request body
    try {
      const user = await findById(userId); // Assuming you have a function to find user by ID
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error retrieving user profile." });
    }
  };
  
  const updateUserProfile = async (req, res) => {
    const userId = req.body.userId;
    const { name, email, password } = req.body;
    try {
      // Validate request data
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Name, email, and password are required." });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format." });
      }
      // Update user profile in the database
      await findByIdAndUpdate(userId, { name, email, password });
      // Return success response
      res.status(200).json({ success: true, message: "User profile updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error updating user profile." });
    }
  };
  
  const deleteUserProfile = async (req, res) => {
    const userId = req.body.userId;
    try {
      // Delete user profile from the database
      await deleteById(userId); // Assuming you have a function to delete user by ID
      // Return success response
      res.status(200).json({ success: true, message: "User profile deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error deleting user profile." });
    }
  };

export { loginUser, registerUser,getUserProfile, updateUserProfile, deleteUserProfile };