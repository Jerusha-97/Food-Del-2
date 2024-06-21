import express from "express"
import {  registerUser,loginUser } from "../controllers/userController.js"
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
// import userModel from './models/userModel.js';

const userRouter=express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.put("/profile", authMiddleware, updateUserProfile);
userRouter.delete("/profile", authMiddleware, deleteUserProfile);

export default userRouter;


