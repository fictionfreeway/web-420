const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const composerSchema = new Schema({
    firstName: String,
    lastName: String
}); 

const Composer = mongoose.model('Composer', composerSchema);

exports.Composer = Composer;