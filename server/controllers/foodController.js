import FoodModel from "../models/foodModel.js"

const getAllFoodLocations = async(request, response) => {

    try {
        
        const allFoodLocations = await FoodModel.find();
        response.status(200).json({
            number: allFoodLocations.length,
            allFoodLocations
        })
    } catch (error) {
        console.error("Error", error) ;
       response.status(500).json({
        error: "Something went wrong",
       })
        
    }
}

export default getAllFoodLocations;