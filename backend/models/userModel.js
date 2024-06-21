// userModel.js
import { connectDB } from "../config/db.js";

const userSchema = {
    name: "NVARCHAR(255) NOT NULL",
    email: "NVARCHAR(255) NOT NULL UNIQUE",
    password: "NVARCHAR(255) NOT NULL",
    cartData: "NVARCHAR(MAX) DEFAULT '{}'"
};

// Example code snippet to handle user registration

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate request data
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Name, email, and password are required." });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format." });
        }

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User with this email already exists." });
        }

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ success: true, message: "User created successfully." });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
async function findById(userId) {
    try {
        const pool = await connectDB();
        const request = pool.request();

        const query = `SELECT * FROM Users WHERE UserID = @userId`;
        request.input('userId', userId);

        const result = await request.query(query);

        return result.recordset[0];
    } catch (error) {
        console.error('SQL error:', error);
        throw error;
    }
}
async function findByIdAndUpdate(userId, updates) {
    try {
        const pool = await connectDB();
        const request = pool.request();

        const setClause = Object.keys(updates).map(key => `${key} = @${key}`).join(',');

        const query = `UPDATE Users SET ${setClause} WHERE UserID = @userId`;
        request.input('userId', userId);
        
        Object.entries(updates).forEach(([key, value]) => {
            request.input(key, value);
        });

        await request.query(query);
    } catch (error) {
        console.error('SQL error:', error);
        throw error;
    }
}




export { createUser, findById, findByIdAndUpdate };


