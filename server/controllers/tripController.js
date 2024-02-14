import TripModel from "../models/tripModel.js";

const getAllTripLocations = async(request, response) => {

    try {
        const allTripLocations = await TripModel.find();
        response.status(200).json({
            number: allTripLocations.length,
            allTripLocations
        })
    } catch (error) {
        console.error("Error", error) ;
       response.status(500).json({
        error: "Something went wrong",
       })
    }
}

export default getAllTripLocations;