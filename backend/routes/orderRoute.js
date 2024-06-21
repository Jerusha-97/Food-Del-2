import express from 'express';
import { connectDB } from '../config/db.js';

const router = express.Router();

// Route to place an order
router.post('/place', async (req, res) => {
  try {
    const pool = await connectDB(); // Ensure database connection
    const { address, items, amount } = req.body; // Extract order data from request body

    // Insert order details into the database
    const query = `
      INSERT INTO orders (address, items, amount) 
      VALUES (@address, @items, @amount);
    `;

    const request = pool.request();
    request.input('address', address);
    request.input('items', items);
    request.input('amount', amount);
    const result = await request.query(query);

    res.status(200).json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, error: 'Failed to place order. Please try again later.' });
  }
});

export default router;
