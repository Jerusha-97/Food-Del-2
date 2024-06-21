// services/emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config(); // Ensure to load environment variables from .env file

export const sendRegistrationEmail = async (restaurantData) => {
  try {
    const { restaurantName, address, description, contact, email, restaurantImage } = restaurantData;

    // Create a nodemailer transporter using your SMTP details
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS, // Use environment variable
      },
    });

    // Get the current date and time
    const currentDate = new Date().toLocaleString();
    // Construct email message with the current date and time
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: email, // Receiver's email address
      subject: 'Restaurant Registration Successfully', // Subject line
      html: `
      <h1 style="color: #333; text-align: center;">Restaurant Registered Successfully!</h1>
      <h3 style="color: #666; text-align: center;">Thank you for registering on Yummy Foods site!</h3>
      <p style="color: #444; line-height: 1.5;"><strong>Restaurant Name:</strong> ${restaurantName}</p>
      <p style="color: #444; line-height: 1.5;"><strong>Address:</strong> ${address}</p>
      <p style="color: #444; line-height: 1.5;"><strong>Description:</strong> ${description}</p>
      <p style="color: #444; line-height: 1.5;"><strong>Contact:</strong> ${contact}</p>
      <p style="color: #444; line-height: 1.5;"><strong>Email:</strong> ${email}</p>
      <p style="color: #444; line-height: 1.5;"><strong>Registration Date & Time:</strong> ${currentDate}</p>
      `,
     attachments: [],
    };
// Check if the restaurantImage file exists
    const imagePath = `./uploads-restaurant/${restaurantData.restaurantImage}`;
    if (fs.existsSync(imagePath)) {
      mailOptions.attachments.push({
        filename: restaurantData.restaurantImage,
        path: imagePath,
        cid: 'restaurantImage',
      });
    } else {
      console.error('Restaurant image file not found:', imagePath);
    }

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully');
  } catch (error) {
    console.error('Error sending registration email:', error);
  }
};
