import express from "express"
import  getAllCosmetics from "../controllers/cosmeticController.js";

const cosmeticRouter = express.Router();

cosmeticRouter.get("/all", getAllCosmetics);

export default cosmeticRouter;