import mssql from 'mssql';
import { connectDB } from '../config/db.js';

// Add a new food item
export const addFood = async ({ name, description, price, image, category }) => {
    const pool = await connectDB(); // Ensure a valid connection
    const request = new mssql.Request(pool); // Use the connection pool to create a request
    
    request.input('name', mssql.VarChar, name);
    request.input('description', mssql.VarChar, description);
    request.input('price', mssql.Float, price);
    request.input('image', mssql.VarChar, image);
    request.input('category', mssql.VarChar, category);

    const insertQuery = `
        INSERT INTO Foods (name, description, price, image, category)
        OUTPUT Inserted.FoodID
        VALUES (@name, @description, @price, @image, @category)
    `;

    const result = await request.query(insertQuery);
    return result.recordset[0]; // Return the inserted food item
};

// Get all food items
export const getAllFoods = async () => {
    const pool = await connectDB(); // Ensure connection
    const request = new mssql.Request(pool); // Create a new request

    const query = 'SELECT * FROM Foods'; // SQL query to fetch all food items
    const result = await request.query(query); // Execute the query
    
    return result.recordset; // Return all food items
};

// Remove a food item
export const removeFood = async (foodID) => {
    const pool = await connectDB(); // Ensure connection
    const request = new mssql.Request(pool); // Create a new request object

    request.input('FoodID', mssql.Int, foodID);

    const selectQuery = 'SELECT * FROM Foods WHERE FoodID = @FoodID';
    const selectResult = await request.query(selectQuery);

    if (selectResult.recordset.length === 0) {
        throw new Error('Food item not found'); // Return an error if the item doesn't exist
    }

    const food = selectResult.recordset[0]; // Get the food item to be deleted

    const deleteQuery = 'DELETE FROM Foods WHERE FoodID = @FoodID';
    await request.query(deleteQuery); // Delete the food item from the database

    return food; // Return the deleted food item for further processing
};
