/* 
Title: watlington-composer-routes.js
Author: William Watlington
Date: 02 October 2022
Description: routes script for composers API
*/

const express = require("express");
const router = express.Router();
const Composer = require("../models/watlington-composer.js");

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composer documents.
 *     summary: returns an array of composer documents in JSON format.
 *     responses:
 *       '200':
 *         description: Array of Composer Documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get("/composers", async(req, res) => {
    try {   
        Composer.find({}, function(err, composers) {
            if(err) {
                res.status(501).send({
                    "message": `MongoDB Exception: ${err}`
                });
            } else {
                res.json(composers);
            }
        })
    } catch(e) {
        res.status(500).send({
            "message": `Server Exception: ${e.message}`
        });
    }
})




/**
 * findComposerById
 * @openapi
 * /api/composers/:id:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning a composer document by ID.
 *     summary: returns a composer document.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           description: id to search for
 *     responses:
 *       '200':
 *         description: Composer Document.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
 router.get("/composers/:id", async(req, res) => {
    try {   
        Composer.findOne({ username: req.params.username }, function(err, composer) {
            if(err) {
                res.status(501).send({
                    "message": `MongoDB Exception: ${err}`
                });
            } else {
                res.json(composer);
            }
        })
    } catch(e) {
        res.status(500).send({
            "message": `Server Exception: ${e.message}`
        });
    }
})

/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     description: API for adding a composer to the database.
 *     summary: adds a new composer document to the database.
 *     requestBody:
 *       description: composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - id
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               id:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Composer Document.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
 router.post("/composers", async(req, res) => {
    try {   
        let newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            id: req.body.id
        };
        await Composer.create(newComposer, function(err, composer) {
            if(err) {
                res.status(501).send({
                    "message": `MongoDB Exception: ${err}`
                });
            } else {
                res.json(composer);
            }
        })
    } catch(e) {
        res.status(500).send({
            "message": `Server Exception: ${e.message}`
        });
    }
})

/**
 * createComposer
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     description: API for updating an existing composer document.
 *     summary: updates existing composer document in database.
 *     parameters: 
 *       - in: path
 *         name: id
 *         description: id to update
 *         schema:
 *           type: number
 *           
 *     requestBody:
 *       description: composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Composer Document.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.put("/composers/:id", async(req, res) => {
    try {   
        Composer.findOne({ id: req.params.id }, function(err, composer) {
            if(err) {
                res.status(501).send({
                    "message": `MongoDB Exception: ${err}`
                });
            } else {
                if(composer) {
                    composer.set({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    })
                    composer.save(function(err, result){
                        if (err){
                            console.log(err);
                        } else {
                            res.json(result);
                        }
                    });
                } else {
                    res.status(401).send({
                        "message": "Invalid composerId"
                    })
                }
            }
        })
    } catch(e) {
        res.status(500).send({
            "message": `Server Exception: ${e.message}`
        });
    }
})

/**
 * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     description: API for updating an existing composer document.
 *     summary: updates existing composer document in database.
 *     parameters: 
 *       - in: path
 *         name: id
 *         description: id to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer Document.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.delete("/composers/:id", async(req, res) => {
    try{
        Composer.findByIdAndDelete( { '_id': req.params.id }, function(err, result) {
            if(err) {
                res.status(501).send({
                    "message": `MongoDB Exception: ${err}`
                });
            } else {
                res.json(result);
            }
        })
    } catch(e) {
        res.status(500).send({
            "message": `Server Exception: ${e.message}`
        });
    }
})


module.exports = router;