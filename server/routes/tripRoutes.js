import express from "express";
import getAllTripLocations from "../controllers/tripController.js";

const tripRouter = express.Router()

tripRouter.get("/all", getAllTripLocations)

export default tripRouter;