import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    username: String
    // line above shorthand for => username: { type: String }
}, { timestamps: true });

const UserModel = mongoose.model("user", userSchema)
// line above: "user" refers to my collection name in the database. 
// Needs to be singular though. The Model is a single document.

export default UserModel