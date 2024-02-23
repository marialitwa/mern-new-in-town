import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({

    type: { type: String, required: false },
    name: { type: String, required: true },
    is_vegan: { type: Boolean, required: false },
    city_district: { type: String, required: false },
    address: { type: String, required: false },
    phone_number: { type: String, required: false},
    website: { type: String, required: false },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: false}

}, { timestamps: true});

 const FoodModel = mongoose.model("food", foodSchema);

 export default FoodModel;