import express from "express";
import { getAllDoctors } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.get("/all", getAllDoctors);

export default doctorRouter;