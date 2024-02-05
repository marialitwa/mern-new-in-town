import CafeRestaurantModel from "../models/cafeRestaurantModel.js";

const getAllCafesRestaurants = async(request, response) => {

    try {
        const allCafesRestaurants = await CafeRestaurantModel.find();
        console.log(allCafesRestaurants)
        response.status(200).json({
            number: allCafesRestaurants.length,
            allCafesRestaurants
        })
    } catch (error) {
        console.error("Error", error);
        response.status(500).json({
            error: "Something went wrong"
        })
        
    }

}

export { getAllCafesRestaurants }