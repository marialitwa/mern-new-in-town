import express from "express";
import getAllFoodSpots from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.get("/all", getAllFoodSpots)

export default foodRouter;