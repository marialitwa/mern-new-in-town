import express from "express";
import getAllCulturalLocations from "../controllers/culturalController.js";

const culturalRouter = express.Router();

culturalRouter.get("/all", getAllCulturalLocations);

export default culturalRouter;