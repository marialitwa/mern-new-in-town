import mongoose from "mongoose";

const sportSchema = new mongoose.Schema({

    type: { type: String, required: false },
    name: { type: String, required: true },
    city_district: { type: String, required: false },
    address: { type: String, required: false },
    website: { type: String, required: false },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: false}

}, { timestamps: true});

const SportModel = mongoose.model("sport", sportSchema);

export default SportModel;