import CosmeticModel from "../models/cosmeticModel.js";

const getAllCosmetics = async(request, response) => {

    try {

        const allCosmetics = await CosmeticModel.find();
        response.status(200).json({
            number: allCosmetics.length,
            allCosmetics
        })
        
    } catch (error) {
        console.error("Error", error);
        response.status(500).json({
            error: "Something went wrong",
        }) 
    }
}

export default getAllCosmetics;