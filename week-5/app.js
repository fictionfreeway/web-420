/* 
Title: app.js
Author: William Watlington
Date: 11 September 2022
Description: main file for persons API
*/

const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const personAPI = require("./routes/watlington-person-routes.js");


let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({'extended': true}));

const conn = 'mongodb+srv://web420_user:s3cret@cluster0.ug54bka.mongodb.net/web420DB?retryWrites=true&w=majority';
mongoose.connect(conn, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Connection successful');
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`)
})

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Persons API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/watlington-person-routes.js']
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', personAPI);

http.createServer(app).listen(app.get('port'), function() {
    console.log(`Application stated and listening on port ${app.get('port')}`)
})