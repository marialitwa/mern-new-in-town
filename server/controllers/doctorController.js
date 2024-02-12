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

export { getAllDoctors, getDoctorById }

