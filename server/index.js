import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());

// Define my first API endpoint using Express
// Basic structure => app.METHOD(PATH, HANDLER)
// app.get("/", (request, response) => {
//     response.send("Hello World!?")
// });

app.use("/api/users", userRouter);
app.use("*", (request, response) => response.status(404).json({ error: "Endpoint not found"}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(port, () => {
        console.log("Mongoose connected and server is running on port " + port);
    });  
    })
    .catch(error => console.error("Error", error));

