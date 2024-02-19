import mongoose from "mongoose";

const culturalSchema = new mongoose.Schema({

    type: { type: String, required: false },
    name: { type: String, required: true },
    city_district: { type: String, required: false },
    address: { type: String, required: false },
    website: { type: String, required: false }

}, { timestamps: true});

const CulturalModel = mongoose.model("cultural", culturalSchema)

export default CulturalModel;
