import bcrypt from 'bcrypt';
import { createRestaurant, checkExistingRestaurant } from '../models/restaurantModel.js';
import { sendRegistrationEmail } from '../services/emailService.js';
import { connectDB } from '../config/db.js';
import mssql from 'mssql';
import fs from 'fs';

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);
};

export const loginRestaurant = async (req, res) => {
  try {
    const { restaurantName, password } = req.body;

    if (!restaurantName || !password) {
      return res.status(400).json({ message: 'Restaurant name and password are required' });
    }

    const pool = await connectDB();
    const request = pool.request();
    request.input('restaurantName', mssql.NVarChar, restaurantName);

    const result = await request.query(`
      SELECT * FROM restaurants WHERE restaurantName = @restaurantName;
    `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const restaurant = result.recordset[0];
    const passwordMatch = await bcrypt.compare(password, restaurant.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', token: 'dummy-token', restaurant });
  } catch (error) {
    console.error('Error logging in restaurant:', error); // Log error to console
    res.status(500).json({ message: 'Error logging in restaurant' });
  }
};

// Function to fetch restaurant profile data for the logged-in restaurant
export const getRestaurantProfile = async (req, res) => {
  try {
    // Get the logged-in restaurant's name from the request
    const loggedInRestaurantName = req.query.restaurantName;

    // Fetch restaurant profile data from the database for the logged-in restaurant
    const restaurantProfileData = await fetchRestaurantProfileData(loggedInRestaurantName);

    const imagePath = `./uploads-restaurant/${restaurantProfileData.restaurantImage}`;
    if (fs.existsSync(imagePath))({
        filename: restaurantProfileData.restaurantImage,
        path: imagePath,
        cid: 'restaurantImage',
      });

    // Send the fetched profile data as a response
    res.status(200).json(restaurantProfileData);
  } catch (error) {
    console.error("Error fetching restaurant profile:", error);
    res.status(500).json({ message: "Error fetching restaurant profile" });
  }
};

// Function to fetch restaurant profile data from the database for the specified restaurant name
const fetchRestaurantProfileData = async (restaurantName) => {
  try {
    // Connect to the database
    const pool = await connectDB();

    // Create a SQL request object
    const request = pool.request();

    // Add the restaurantName parameter to the request
    request.input('restaurantName', mssql.NVarChar, restaurantName);

    // Execute the SQL query to fetch profile data for the specified restaurant
    const queryResult = await request.query("SELECT * FROM restaurants WHERE restaurantName = @restaurantName;");

    // Return the fetched profile data
    return queryResult.recordset;
  } catch (error) {
    console.error('Error fetching restaurant profile data:', error);
    throw error;
  }
};


export const registerRestaurant = async (req, res) => {
  try {
    const { restaurantName, password, address, description, contact, email } = req.body;
    const restaurantImage = req.file ? req.file.filename : null;

    if (!restaurantName || !password || !address || !description || !contact || !email || !restaurantImage) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingRestaurant = await checkExistingRestaurant(restaurantName);
    if (existingRestaurant) {
      return res.status(400).json({ message: 'Restaurant name already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const pool = await connectDB();
    const request = pool.request();
    request.input('restaurantName', mssql.NVarChar, restaurantName);
    request.input('password', mssql.NVarChar, hashedPassword);
    request.input('address', mssql.NVarChar, address);
    request.input('description', mssql.NVarChar, description);
    request.input('contact', mssql.NVarChar, contact);
    request.input('email', mssql.NVarChar, email);

    const imageBuffer = Buffer.from(restaurantImage, 'base64');
    request.input('restaurantImage', mssql.VarBinary, imageBuffer);

    await request.query(`
      INSERT INTO restaurants (restaurantName, password, address, description, contact, email, restaurantImage)
      VALUES (@restaurantName, @password, @address, @description, @contact, @email, @restaurantImage);
    `);

    const restaurantData = {
      restaurantName,
      password: hashedPassword,
      address,
      description,
      contact,
      email,
      restaurantImage,
    };

    await sendRegistrationEmail(restaurantData);

    res.status(201).json({ message: 'Restaurant registered successfully' });
  } catch (error) {
    console.error('Error registering restaurant:', error); // Log error to console
    res.status(500).json({ message: 'Error registering restaurant' });
  }
};