import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({

    type: {type: String, required: false },
    name: {type: String, required: true},
    city_district: { type: String, required: false},
    address: { type: String, required: false},
    website: { type: String, required: false}
})

const TripModel = mongoose.model("trip", tripSchema)

export default TripModel;