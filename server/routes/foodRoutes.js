import express from "express";
import getAllFoodLocations from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.get("/all", getAllFoodLocations)

export default foodRouter;