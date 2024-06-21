import { connectDB } from '../config/db.js';
import mssql from 'mssql';

export const checkExistingRestaurant = async (restaurantName) => {
  const pool = await connectDB();
  
  try {
    const request = pool.request();
    request.input('restaurantName', mssql.NVarChar, restaurantName);

    const result = await request.query(`
      SELECT COUNT(*) AS count FROM restaurants WHERE restaurantName = @restaurantName;
    `);
    
    return result.recordset[0].count > 0;
  } catch (error) {
    console.error('Error checking existing restaurant:', error);
    throw error;
  }
};

export const createRestaurant = async (restaurant) => {
  const { restaurantName, password, address, description, contact, email, restaurantImage } = restaurant;
  const pool = await connectDB();
  
  try {
    const request = pool.request();
    request.input('restaurantName', mssql.NVarChar, restaurantName);
    request.input('password', mssql.NVarChar, password);
    request.input('address', mssql.NVarChar, address);
    request.input('description', mssql.NVarChar, description);
    request.input('contact', mssql.NVarChar, contact);
    request.input('email', mssql.NVarChar, email);

    const imageBuffer = Buffer.from(restaurantImage, 'base64');
    request.input('restaurantImage', mssql.VarBinary, imageBuffer);

    const result = await request.query(`
      INSERT INTO restaurants (restaurantName, password, address, description, contact, email, restaurantImage)
      VALUES (@restaurantName, @password, @address, @description, @contact, @email, @restaurantImage);
    `);
    
    return result.recordset;
  } catch (error) {
    console.error('Error creating restaurant:', error);
    throw error;
  }
};