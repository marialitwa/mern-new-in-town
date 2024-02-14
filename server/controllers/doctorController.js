import DoctorModel from "../models/doctorModel.js"

const getAllDoctors = async(request, response) => {

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

const getDoctorById = async(request, response) => {

  const id = request.params.id
  const foundDoctor = await DoctorModel.findById(id);

  console.log("Found Doctor", foundDoctor);

  response.status(200).json(foundDoctor);
  console.log(request)
}

const addCard = async (request, response) => {

  // Start with test in Postman
  // response.send("testing");
  
  console.log(request.body);

  try {
    const newEntry = await DoctorModel.create(request.body)
    console.log(newEntry);

    if (newEntry) response.status(201).json(newEntry);
    else response.status(400).json({ error: "New entry could not be created"})
    
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message })
  }
}

export { getAllDoctors, getDoctorById, addCard }

