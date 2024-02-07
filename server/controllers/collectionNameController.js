import mongoose from "mongoose";

const getAllCollectionNames = async(request, response) => {
   
    const collections =  mongoose.connections[0].collections
    const collectionNames=Object.keys(collections)
    console.log("Collections", Object.keys(collections));
    console.log('collections', collections)
   
if (collectionNames.length === 0 ){
    response.status(500).json({
        message: "no collections stored yet"
    })
}
if (collectionNames.length > 0){
    response.status(200).json({
        collectionNames: collectionNames
    })
}
}

export { getAllCollectionNames }