// server.js
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRouter.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import orderRouter from './routes/orderRoute.js';
import joinUsRouter from './routes/joinUs.js'; // Import joinUs router
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files
app.use('/uploads-restaurant', express.static('uploads-restaurant'));
app.use('/images', express.static('uploads'));

// DB connection
connectDB();

// API endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/order', orderRouter);
app.use('/api/join', joinUsRouter); // Use joinUs router

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
