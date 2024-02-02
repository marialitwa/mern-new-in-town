import express from "express";
import { getAllUsers, test, findUserByEmail, signup } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/testing", test);
userRouter.get("/all", getAllUsers);
userRouter.get("/find/:email", findUserByEmail);

userRouter.post("/signup", signup);

export default userRouter