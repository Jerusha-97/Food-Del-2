import { connectDB } from '../config/db.js';

export const placeOrder = async (req, res) => {
  try {
    const pool = await connectDB(); // Ensure database connection
    const { address, items, amount } = req.body; // Extract order data from request body

    const query = `
      INSERT INTO orders (address, items, amount) 
      VALUES (@address, @items, @amount);
    `;

    const request = pool.request();
    request.input('address', address);
    request.input('items', JSON.stringify(items)); // Convert items to JSON string
    request.input('amount', amount);
    
    await request.query(query);

    res.status(200).json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, error: 'Failed to place order. Please try again later.' });
  }
};
