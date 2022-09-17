/* 
Title: watlington-user.js
Author: William Watlington
Date: 17 September 2022
Description: file to create model for person
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: { type: String },
    Password: { type: String },
    emailAddress: { type: Array }
});

module.exports = mongoose.model("User", userSchema);