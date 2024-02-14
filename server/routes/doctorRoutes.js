import express from "express";
import { addCard, getAllDoctors, getDoctorById } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

// Read data
doctorRouter.get("/all", getAllDoctors);
doctorRouter.get("/:id", getDoctorById);

// Add data
doctorRouter.post("/new-entry", addCard)

export default doctorRouter;