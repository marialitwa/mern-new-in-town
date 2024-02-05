import express from "express";
import { getAllCafesRestaurants } from "../controllers/cafeRestaurantController.js";

const cafeRestaurantRouter = express.Router();

cafeRestaurantRouter.get("/all", getAllCafesRestaurants);

export default cafeRestaurantRouter;