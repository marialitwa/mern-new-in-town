import express from "express";
import { getAllUsers, findUserByEmail, signup, login, getProfile } from "../controllers/userController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const userRouter = express.Router();

userRouter.get("/all", getAllUsers);
userRouter.get("/find/:email", findUserByEmail);
userRouter.get("/profile", jwtAuth, getProfile);

userRouter.post("/signup", signup);
userRouter.post("/login", login);

export default userRouter