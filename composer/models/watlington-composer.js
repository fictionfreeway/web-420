/* 
Title: watlington-composer.js
Author: William Watlington
Date: 02 October 2022
Description: file to create model for composer
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let composerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }, 
    id: { type: Number }
});

module.exports = mongoose.model("Composer", composerSchema);