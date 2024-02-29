import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    username: String,
    // line above shorthand for => username: { type: String }
    // created_cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "doctor" }]
    created_cards: [{ type: Object }]

    // RESEARCH HOW TO INCLUDE A SET OF COLLECTIONS
    // created_cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "doctor, cosmetic, cultural, food, sport, trip" }]

}, { timestamps: true });

const UserModel = mongoose.model("user", userSchema)
// line above: "user" refers to my collection name in the database. 
// Needs to be singular though. The Model is a single document.

export default UserModel