import FoodModel from "../models/foodModel.js"

const getAllFoodSpots = async(request, response) => {

    try {
        
        const allFoodSpots = await FoodModel.find();
        response.status(200).json({
            number: allFoodSpots.length,
            allFoodSpots
        })
    } catch (error) {
        console.error("Error", error) ;
       response.status(500).json({
        error: "Something went wrong",
       })
        
    }
}

export default getAllFoodSpots;