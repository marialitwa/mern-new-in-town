import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({

    medical_specialty: {type: String, required: false},
    name: { type: String, required: true}, 
    medical_practice: { type: String, required: false},
    city_district: { type: String, required: false},
    address: { type: String, required: false},
    phone_number: { type: String, required: false},
    website: { type: String, required: false},
    notes: { type: String, required: false},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: false}

}, { timestamps: true});

const DoctorModel = mongoose.model("doctor", doctorSchema);

export default DoctorModel;
