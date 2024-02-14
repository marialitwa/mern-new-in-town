import CulturalModel from "../models/culturalModel.js";

const getAllCulturalLocations = async(request, response) => {

    try {

        const allCulturalLocations = await CulturalModel.find();
        response.status(200).json({
            number: allCulturalLocations.length,
            allCulturalLocations
        })
        
    } catch (error) {
        console.error("Error", error) ;
        response.status(500).json({
         error: "Something went wrong",
        })
     }
}

export default getAllCulturalLocations;



    