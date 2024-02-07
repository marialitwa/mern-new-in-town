import colors from "colors";
import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import doctorRouter from "./routes/doctorRoutes.js"
import mongoose from "mongoose";
import cafeRestaurantRouter from "./routes/cafeRestaurantRoutes.js";

// Initializing Express ==========
const app = express();

// ===============================

// Adding Middlewares ==========

const addMiddlewares = () => {
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.use(cors());
}
// ===============================



// Define my first API endpoint using Express
// Basic structure => app.METHOD(PATH, HANDLER)
// app.get("/", (request, response) => {
//     response.send("Hello World!?")
// });

const addRoutes = () => {
    app.use("/api/users", userRouter);
    app.use("/api/doctors", doctorRouter);
    app.use("/api/cafes-restaurants", cafeRestaurantRouter)
    app.use("*", (request, response) => 
    response.status(404).json({ error: "Endpoint not found"}));

    // Route to display collection names
    app.get("/api/collections", async (request, response) => {

        try {
            const collections = await mongoose.collection.db.listCollections().toArray();
            const collectionNames = collections.map((collection) => collection.name);
            response.json(collectionNames)
            
        } catch (error) {
            console.error("Error fetching collection names", error);
            response.status(500).json({ error: "Interntal Server Error"});
        }
    })

    app.use("*", (request, response) => 
    response.status(404).json({ error: "Endpoint not found"})
    );

};

const startServer = () => {
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`.bgCyan);
    });  
}

const DBConnection = async() => {
    try {
      await mongoose.connect(process.env.MONGO_URI) ;
      console.log("Connection to MongoDB established".bgGreen) 
    } catch (error) {
        console.error("Error connecting to MongoDB".bgRed, error);
    }
}


// IIFE Function => Immediately Invoked Function Expression.
// => JS Function that runs as soon as it is defined. Because 
// it is an IIFE function we do not need to call it

(async function backendController() {
    await DBConnection();
    addMiddlewares();
    addRoutes();
    startServer();
})();


// 




