import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({

    medical_specialty: {type: String, required: false},
    name: { type: String, required: true},
    city_district: { type: String, required: false},
    address: { type: String, required: false},
    phone_number: { type: String, required: false}
})

const DoctorModel = mongoose.model("doctor", doctorSchema);

export default DoctorModel;