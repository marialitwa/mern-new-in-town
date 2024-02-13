import express from "express";
import getAllCulturalSpots from "../controllers/culturalController.js";

const culturalRouter = express.Router();

culturalRouter.get("/all", getAllCulturalSpots);

export default culturalRouter;