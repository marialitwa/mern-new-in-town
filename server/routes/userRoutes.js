import express from "express";
import { getAllUsers, findUserByEmail, signup, login } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/all", getAllUsers);
userRouter.get("/find/:email", findUserByEmail);

userRouter.post("/signup", signup);
userRouter.post("/login", login);

export default userRouter