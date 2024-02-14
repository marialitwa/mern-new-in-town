import SportModel from "../models/sportModel.js";

const getAllSportLocations = async(request, response) => {

    try {
        const allSportLocations = await SportModel.find();
        response.status(200).json({
            number: allSportLocations.length,
            allSportLocations
        })
    } catch (error) {
        console.error("Error", error) ;
       response.status(500).json({
        error: "Something went wrong",
       })
    }
}

export default getAllSportLocations;