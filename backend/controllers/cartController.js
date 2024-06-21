// cartController.js
import { findById, findByIdAndUpdate } from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const userData = await findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User data not found" });
        }
        
        let cartData = {};
        if (userData.CartData) {
            cartData = JSON.parse(userData.CartData);
        }
        
        const itemId = req.body.itemId;
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        await findByIdAndUpdate(req.body.userId, { CartData: JSON.stringify(cartData) });

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


const removeFromCart = async (req, res) => {
    try {
        const userData = await findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User data not found" });
        }
        
        let cartData = {};
        if (userData.CartData) {
            cartData = JSON.parse(userData.CartData);
        }
        
        const itemId = req.body.itemId;
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await findByIdAndUpdate(req.body.userId, { CartData: JSON.stringify(cartData) });

        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const getCart = async (req, res) => {
    try {
        const userData = await findById(req.body.userId);
        if (!userData || !userData.CartData) {
            return res.json({ success: false, message: "User data or cart data not found" });
        }
        
        const cartData = JSON.parse(userData.CartData);
        
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


export { addToCart, removeFromCart, getCart };
