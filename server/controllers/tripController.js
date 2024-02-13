import TripModel from "../models/tripModel.js";

const getAllTrips = async(request, response) => {

    try {
        const allTrips = await TripModel.find();
        response.status(200).json({
            number: allTrips.length,
            allTrips
        })
    } catch (error) {
        console.error("Error", error) ;
       response.status(500).json({
        error: "Something went wrong",
       })
    }
}

export default getAllTrips;