import express from "express";
import { getAllUsers, signup, login, getProfile, updateUser } from "../controllers/userController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const userRouter = express.Router();

userRouter.get("/all", getAllUsers);
userRouter.get("/profile", jwtAuth, getProfile);

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/update/:id", jwtAuth, updateUser);

export default userRouter