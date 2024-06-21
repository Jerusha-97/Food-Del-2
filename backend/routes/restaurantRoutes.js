import express from 'express';
import multer from 'multer';
import path from 'path';
import { registerRestaurant, loginRestaurant, getRestaurantProfile } from '../controllers/restaurantController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads-restaurant/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


router.post('/register', upload.single('restaurantImage'), registerRestaurant);
router.post('/login', loginRestaurant);
router.get('/profile', getRestaurantProfile);

export default router;
