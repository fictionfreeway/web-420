/* 
Title: watlington-composer.js
Author: William Watlington
Date: 08 October 2022
Description: file to create models for capstone api
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let playerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    salary: { type: Number }
})

let teamSchema = new Schema ({
    name: { type: String },
    mascot: { type: String },
    players: [playerSchema]
})

module.exports = mongoose.model("Team", teamSchema);