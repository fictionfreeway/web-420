/* 
Title: watlington-person.js
Author: William Watlington
Date: 11 September 2022
Description: file to create model for person
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roleSchema = new Schema({
    text: { type: String }
});

let dependentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
});

let personSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: { type: String } 
});

module.exports = mongoose.model('Person', personSchema);