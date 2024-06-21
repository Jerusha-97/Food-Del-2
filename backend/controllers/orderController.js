// orderController.js

import mssql from "mssql";
import connectDB from "../config/db.js"; // Import the database configuration

// Function to place an order
export const placeOrder = async (req, res) => {
  try {
    // Extract necessary data from the request body
    const { firstName, lastName, email, street, city, state, zipcode, country, phone, items, amount } = req.body;

    // Validate the address parameter
    if (!street || !city || !state || !zipcode || !country) {
      throw new Error("Address is incomplete");
    }

    // Create a connection pool using the imported connectDB
    const pool = await new mssql.ConnectionPool(connectDB).connect();

    // Create a new request instance
    const request = pool.request();

    // Set parameters for the SQL query
    request.input("firstName", mssql.VarChar, firstName);
    request.input("lastName", mssql.VarChar, lastName);
    request.input("email", mssql.VarChar, email);
    request.input("street", mssql.VarChar, street);
    request.input("city", mssql.VarChar, city);
    request.input("state", mssql.VarChar, state);
    request.input("zipcode", mssql.VarChar, zipcode);
    request.input("country", mssql.VarChar, country);
    request.input("phone", mssql.VarChar, phone);
    request.input("amount", mssql.Decimal, amount);

    // Execute the SQL query
    const result = await request.query(`INSERT INTO Orders (firstName, lastName, email, street, city, state, zipcode, country, phone, amount) 
                                        VALUES (@firstName, @lastName, @email, @street, @city, @state, @zipcode, @country, @phone, @amount);
                                        SELECT SCOPE_IDENTITY() AS orderId;`);

    // Get the newly inserted orderId
    const orderId = result.recordset[0].orderId;

    // Insert order items into the OrderItems table
    for (const item of items) {
      await request.query(`INSERT INTO OrderItems (orderId, FoodID, quantity) VALUES (${orderId}, ${item.FoodID}, ${item.quantity})`);
    }

    // Close the connection pool
    await pool.close();

    // Send success response
    res.status(200).json({ success: true, orderId });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ success: false, error: "Failed to place order. Please try again later." });
  }
};
