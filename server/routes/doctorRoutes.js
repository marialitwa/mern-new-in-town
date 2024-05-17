import express from "express";
import { addCard, deleteCard, getAllDoctors, getDoctorById, updateCard } from "../controllers/doctorController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const doctorRouter = express.Router();

// Read data from manually created MongoDB database collection
doctorRouter.get("/all", jwtAuth, getAllDoctors);
doctorRouter.get("/:id", jwtAuth, getDoctorById);

// Add data from frontend (or Postman) to MongoDb database collection
// doctorRouter.post("/new-entry", jwtAuth, addCard)
doctorRouter.post("/new-entry", jwtAuth, addCard)


// Delete data from frontend (or Postman) to MongoDb database collection
doctorRouter.delete("/delete", jwtAuth, deleteCard)

// Update data from frontend (or Postman) to MongoDb database collection
doctorRouter.put("/update", jwtAuth, updateCard)

export default doctorRouter;