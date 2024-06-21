import { connectDB } from '../config/db.js'; // Import connectDB to establish MSSQL connection
import mssql from 'mssql'; // Import mssql for SQL operations
import { addFood as addFoodToModel } from "../models/foodModel.js"; // Import the `addFood` method
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Import for ES modules


// Add food item
const addFood = async (req, res) => {
  // Correctly retrieve the filename of the uploaded image
    const image_filename = req.file.filename;
  try {
    // Create a new food item by passing the details to the function that adds food in the model
    const food = await addFoodToModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    res.status(201).json({ success: true, message: "Food Added", food });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

// Function to list all food items
const listFood = async (req, res) => {
  try {
    const pool = await connectDB(); // Get a valid connection pool
    const request = new mssql.Request(pool); // Create a request with the connection pool

    const query = 'SELECT * FROM Foods'; // SQL query to fetch all food items

    const result = await request.query(query); // Execute the query
    res.json({ success: true, data: result.recordset }); // Return the list of foods
  } catch (error) {
    console.error("Error fetching food list:", error);
    res.status(500).json({ success: false, message: "Error fetching food list" });
  }
};


const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Correctly define __dirname

const removeFood = async (req, res) => {
  const { FoodID } = req.body;

  try {
    const pool = await connectDB(); // Get a valid connection
    const request = new mssql.Request(pool); // Create a request with the connection pool

    request.input('FoodID', mssql.Int, FoodID);
    const selectQuery = 'SELECT * FROM Foods WHERE FoodID = @FoodID';
    const result = await request.query(selectQuery);

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, message: 'Food item not found' });
    }

    const food = result.recordset[0];

    // Delete the food item from the database
    const deleteQuery = 'DELETE FROM Foods WHERE FoodID = @FoodID';
    await request.query(deleteQuery); // Execute the delete query

    // Check if the associated image file exists and delete it
    const imagePath = path.join(__dirname, '../uploads/', food.image); // Correct __dirname usage
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
        } else {
          console.log('Image deleted successfully:', imagePath);
        }
      });
    } else {
      console.warn('Image not found for deletion:', imagePath);
    }

    res.json({ success: true, message: 'Food removed successfully' });
  } catch (error) {
    console.error('Error removing food:', error);
    res.status(500).json({ success: false, message: 'Error removing food' });
  }
};

export { addFood, listFood ,removeFood}; // Export the corrected controller functions