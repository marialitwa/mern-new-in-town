import mongoose from "mongoose";

const cafeRestaurantSchema = new mongoose.Schema({

        type: { type: String, required: false},
        name: { type: String, required: true},
        city_district: { type: String, required: false}

})

// const CafeRestaurantModel = mongoose.model("cafe-restaurants", cafeRestaurantSchema);
const CafeRestaurantModel = mongoose.model("cafes-restaurants", cafeRestaurantSchema);

export default CafeRestaurantModel;