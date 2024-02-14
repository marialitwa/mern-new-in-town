import mongoose from "mongoose";

const cosmeticSchema = new mongoose.Schema({

    type: { type: String, required: false },
    name: { type: String, required: true },
    city_district: { type: String, required: false },
    address: { type: String, required: false },
    phone_number: { type: String, required: false },
    website: { type: String, required: false }
}, { timestamps: true});

const CosmeticModel = mongoose.model("cosmetic", cosmeticSchema);

export default CosmeticModel;