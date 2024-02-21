import DoctorModel from "../models/doctorModel.js"
import colors from "colors";



// GET ALL DOCUMENTS FROM MY DB COLLECTION => complete list of all doctors
const getAllDoctors = async(request, response) => {

  // sort method here to reverse order => newest added comes first
    try {
      const allDoctors = await DoctorModel.find();
      response.status(200).json({
        number: allDoctors.length,
        allDoctors

      })  
    } catch (error) {
       console.error("Error", error) ;
       response.status(500).json({
        error: "Something went wrong",
       })
    }
}

// GET SINGLE DOCUMENT FROM MY DB COLLECTION => get a specific, single doctor 
const getDoctorById = async(request, response) => {

  const id = request.params.id
  const foundDoctor = await DoctorModel.findById(id);

  console.log("Found Doctor", foundDoctor);

  response.status(200).json(foundDoctor);
  console.log(request)
}


// ADD A DOCTOR / DOCUMENT TO MY DB COLLECTION => add a single doctor 
const addCard = async (request, response) => {

  // Start with test in Postman
  // response.send("testing");
  
  // console.log("req.body", request.body);
  
  if (!request.body.name) return response.status(400).json({ error: "Name must be included."})

  try {
    const newEntry = await DoctorModel.create(request.body)
    console.log("newEntry", newEntry);

    if (newEntry) response.status(201).json(newEntry);
    else response.status(400).json({ error: "New entry could not be created"})
    
  } catch (error) {
    console.error(error);

    if (error.code === 11000) response.status(400).json({ error: "Item already listed" })
    response.status(500).json({ error: error.message })
  }
}



// DELETE A DOCTOR / DOCUMENT FROM MY DB COLLECTION => delete a specific doctor 
const deleteCard = async(request, response) => {
  
  const id = request.body.id

  try {
    const findCurrentCard = await DoctorModel.findByIdAndDelete(id)

    if (!findCurrentCard) {
      return response.status(404).json({ message: "Card not found" })
    }
    return response.status(200).json({ message: "Successfully deleted" })

  } catch (error) {
    console.error();
    return response.status(500).json({ message: "Could not delete document. Please try again."})
    
  }
}

// UPDATE A DOCTOR / DOCUMENT FROM MY DB COLLECTION => edit dataset of a specific doctor 
const updateCard = async(request, response) => {

  const id = request.body.id

  const { medical_specialty, name, medical_practice, city_district, address, phone_number, website } = request.body;
  let currentCardToUpdate


  try {
    currentCardToUpdate = await DoctorModel.findByIdAndUpdate(id, currentCardToUpdate, { new: true})

    //do some validation and inputs sanitation

    if (!currentCardToUpdate) {
      return response.status(404).json({ message: "Card not found" })
    }

    if (!currentCardToUpdate.name) {
      return response.status(400).json({ error: "Name must be included."}) 
    }

  } catch (error) {
    console.error("Error", error)
    return response.status(500).json({ message: "Something went wrong while updating! Please try again." })
  }

  if (!currentCardToUpdate) {
    return response.status(500).json({ message: "Unable to update card."})
  }

  return response.status(200).json({ currentCardToUpdate, message: "Card is now updated."})
}


export { getAllDoctors, getDoctorById, addCard, deleteCard, updateCard }

