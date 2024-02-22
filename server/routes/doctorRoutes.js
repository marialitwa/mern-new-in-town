import express from "express";
import { addCard, deleteCard, getAllDoctors, getDoctorById, updateCard } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

// Read data from manually created MongoDB database collection
doctorRouter.get("/all", getAllDoctors);
doctorRouter.get("/:id", getDoctorById);

// Add data from frontend (or Postman) to MongoDb database collection
doctorRouter.post("/new-entry", addCard)

// Delete data from frontend (or Postman) to MongoDb database collection
doctorRouter.delete("/delete", deleteCard)

// Update data from frontend (or Postman) to MongoDb database collection
doctorRouter.put("/update", updateCard)

export default doctorRouter;