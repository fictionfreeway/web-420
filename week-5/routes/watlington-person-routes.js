/* 
Title: watlington-person-routes.js
Author: William Watlington
Date: 11 September 2022
Description: routes script for persons API
*/

const express = require("express");
const router = express.Router();
const Person = require('../models/watlington-person.js');

/**
 * findAllPersons
 * @openapi
 * /people:
 *   get:
 *     tags:
 *       - Persons
 *     description: API for returning an array of person documents.
 *     summary: returns an array of person documents in JSON format.
 *     responses:
 *       '200':
 *         description: Person added.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/people', async(req, res) => {
    try {
        Person.find({}, function (err, people) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                res.json(people);
            }
        })
    } catch(e) {
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
})


/**
 * createPerson
 * @openapi
 * /people:
 *   post:
 *     tags:
 *       - Persons
 *     description: API for adding person to database.
 *     summary: adds person to database.
 *     requestBody:
 *         description: person information
 *         content:
 *             application/json:
 *                 schema: 
 *                     required:
 *                         - firstName
 *                         - lastName
 *                         - roles
 *                         - dependents
 *                         - birthDate
 *                     properties:
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                         roles:
 *                           type: array
 *                         dependents: 
 *                           type: array
 *                         birthDate:
 *                           type: string
 *     responses:
 *       '200':
 *         description: Person added to database.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.post("/people", async(req, res) => {
    try {
        const newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles, 
            dependents: req.body.dependents,
            birthDate: req.body.birthDate
        };
        
        await Person.create(newPerson, function (err, person) {
            if (err) {
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                res.json(person);
            }
        })
    } catch(e) {
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
})

module.exports = router;