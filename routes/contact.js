//MADE BY:- Ayush Gupta - 1910990212 - st2

var express = require("express");
const { check } = require('express-validator');
var router = express.Router();
const {getContactById, updateContact, createContact, allContacts, getContact, removeContact} = require("../controllers/contact");


router.param("contactId", getContactById)

//create
router.post("/createcontact", createContact)

//read
router.get("/contacts", allContacts)
router.get("/contact/:contactId", getContact)

//update
router.put("/updatecontact/:contactId/", updateContact)

//delete
router.delete("/contact/:contactId", removeContact)

module.exports = router;