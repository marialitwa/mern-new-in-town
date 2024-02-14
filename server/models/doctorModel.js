import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({

    medical_specialty: {type: String, required: false},
    name: { type: String, required: true},
    medical_practice: { type: String, required: false},
    city_district: { type: String, required: false},
    address: { type: String, required: false},
    phone_number: { type: String, required: false},
    website: { type: String, required: false}
})

const DoctorModel = mongoose.model("doctor", doctorSchema);

export default DoctorModel;



// OPTIONal in case I would split up address field

// const doctorSchema = new mongoose.Schema({

//     medical_specialty: {type: String, required: false},
//     name: { type: String, required: true},
//     city_district: { type: String, required: false},
//     address: {
//         city: { type: String,required: false},
//         street { type: String,required: false},
//         housenumber: { type: String,required: false},
//         postalcode: { type: String,required: false},
//     }
//     phone_number: { type: String, required: false}
// })