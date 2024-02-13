import CulturalModel from "../models/culturalModel.js";

const getAllCulturalSpots = async(request, response) => {

    try {

        const allCulturalSpots = await CulturalModel.find();
        response.status(200).json({
            number: allCulturalSpots.length,
            allCulturalSpots
        })
        
    } catch (error) {
        console.error("Error", error) ;
        response.status(500).json({
         error: "Something went wrong",
        })
     }
}

export default getAllCulturalSpots;



    