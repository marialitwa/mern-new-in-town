import express from "express";
import getAllSportLocations from "../controllers/sportController.js";

const sportRouter = express.Router();

sportRouter.get("/all", getAllSportLocations);

export default sportRouter;