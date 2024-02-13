import express from "express";
import getAllTrips from "../controllers/tripController.js";

const tripRouter = express.Router()

tripRouter.get("/all", getAllTrips)

export default tripRouter;