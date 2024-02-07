import express from "express";
import { getAllCollectionNames } from "../controllers/collectionNameController.js"

const collectionNameRouter = express.Router();

collectionNameRouter.get("/all", getAllCollectionNames);

export default collectionNameRouter;