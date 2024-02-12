import express from "express";
import { getAllDoctors, getDoctorById } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.get("/all", getAllDoctors);
doctorRouter.get("/:id", getDoctorById);

export default doctorRouter;