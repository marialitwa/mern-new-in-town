import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true},
    userName: { type: String, required: false, unique: true},
    userImage: { type: String, required: false, unique: false},
    created_cards: [{ type: Object }]
}, 
{ timestamps: true });

const UserModel = mongoose.model("user", userSchema)
// line above: "user" refers to my collection name in the database. 
// Needs to be singular though. The Model is a single document.

export default UserModel