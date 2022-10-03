/* 
Title: watlington-node-shopper-routes.js
Author: William Watlington
Date: 25 September 2022
Description: routes script for node-shopper API
*/

const express = require("express");
const router = express.Router();
const Customer = require("../models/watlington-customer.js");


/**
 * createCustomer
 * @openapi
 * /api/createCustomer:
 *   post:
 *     tags:
 *       - Customers
 *     description: API for adding customer to database.
 *     summary: adds customer to database.
 *     requestBody:
 *         description: customer information
 *         content:
 *             application/json:
 *                 schema: 
 *                     required:
 *                         - firstName
 *                         - lastName
 *                         - userName
 *                     properties:
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                         userName:
 *                           type: string
 *     responses:
 *       '200':
 *         description: Customer added to database
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.post("/createCustomer", async(req, res) => {
    try {
        let newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        }
        Customer.create(newCustomer, function (err, customer) {
            if(err) {
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                res.json(customer);
            }
        })
    } catch(e) {
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
})

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/:username/invoices:
 *   post:
 *     tags:
 *       - Invoices
 *     description: API for creating invoices.
 *     summary: adds invoice to database.
 *     parameters:
 *     - in: path
 *       name: username
 *       schema:
 *         type: string
 *       required: true
 *       description: username to add invoice to  
 *     requestBody:
 *         description: invoice information
 *         content:
 *             application/json:
 *                 schema: 
 *                     required:
 *                         - subtotal
 *                         - tax
 *                         - dateCreated
 *                         - dateShipped
 *                     properties:
 *                         subtotal:
 *                           type: string
 *                         tax:
 *                           type: string
 *                         dateCreated:
 *                           type: string
 *                         dateShipped:
 *                           type: string
 *                         lineItems:
 *                           type: array
 *     responses:
 *       '200':
 *         description: Invoice added to customer document
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.post("/customers/:username/invoices", async(req, res) => {
    try {
        Customer.findOne({ username: req.params.username }, function(err, user) {
            if(err) {
                res.status(501).send({
                    "message": `MongoDB Exception: ${err}`
                });
            } else {
                let newInvoice = {
                    subtotal: req.body.subtotal,
                    tax: req.body.tax,
                    dateCreated: req.body.dateCreated,
                    dateShipped: req.body.dateShipped,
                    lineItems: []
                }
                user.invoices.push(newInvoice);
                user.save(function(err, result){
                    if (err){
                        console.log(err);
                    } else {
                        res.json(result);
                    }
                });
            }
        });
    } catch(e) {
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
})

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/:username/invoices:
 *   get:
 *     tags:
 *       - Invoices
 *     description: API for finding all invoices from username.
 *     summary: view user invoices.
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: username to query invoices for
 *     responses:
 *       '200':
 *         description: User invoices.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/customers/:username/invoices', async(req, res) => {
    try {
        Customer.findOne({ username: req.params.username}, function(err, user) {
            if(err) {
                res.status(501).send({
                    "message": `MongoDB Exception: ${err}`
                });
            } else {
                res.json(user.invoices)
            }
        })
    } catch(e) {
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
})

module.exports = router;