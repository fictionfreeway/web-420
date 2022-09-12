const { application } = require("express");
const express = require("express");
const { Composer } = require("../models/watlington-composer");

const app = express();
const router = express.Router();

app.get('/api/composers', function (req, res) {
    try {
        let composers = Composer.find();
        res.status(200).json(composers);
    } 
    catch {
        let message = "Server Exception";
        res.status(500).json(message);
    }
})


app.listen(3000, () => console.log("App is listening on port 3000."));