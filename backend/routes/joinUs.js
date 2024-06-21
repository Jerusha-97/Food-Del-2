import express from 'express';
import sendEmail from '../services/emailjoinus.js';
const router = express.Router();
// Function to generate a random numeric OTP
const generateNumericOTP = (length) => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
// Temporary storage for OTPs; use a more secure method like a database or Redis in production
const otpStorage = {};
router.post('/sendOTP', async (req, res) => {
  const { email } = req.body;
  const otp = generateNumericOTP(6); // Generate numeric OTP
  // Send OTP via email
  const subject = 'Yummy Foods Join US OTP Verification';
  const text = `Your Yummy Foods Join US OTP is ${otp}`;
  try {
    await sendEmail(email, subject, text);
    otpStorage[email] = otp; // Store the OTP temporarily
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});
router.post('/verifyOTP', (req, res) => {
  const { email, otp } = req.body;
  if (otpStorage[email] && otpStorage[email] === otp) {
    delete otpStorage[email]; // OTP verified, remove from storage
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
});
export default router;