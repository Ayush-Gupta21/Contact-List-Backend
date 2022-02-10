//MADE BY:- Ayush Gupta - 1910990212 - st2

const Contact = require("../models/contact");
const formidable = require("formidable");
const {validationResult } = require('express-validator');
const _ = require("lodash");


exports.getContactById = (req, res, next, id)=>{
    Contact.findById(id)
    .exec((err, contact)=>{
        if(err){
            return res.status(400).json({
                error: "Contact not found"
            })
        }
        req.contact = contact;
        next();
    })
}

exports.getContact = (req, res)=>{
    return res.json(req.contact);
}

//create
exports.createContact = (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error: "problem with Image"
            })
        }
        const {name, mobile, email} = fields;
        //create a contact object and put fields in it which is just a simple data
        let contact = new Contact(fields);
        //Now save the contact to the DB
        contact.save((err, contact)=>{
            if(err){
                return res.status(400).json({
                    error: "Email or mobile already used"
                })
            }
            res.json(contact);
        })
    })
}

//read
exports.allContacts = (req, res)=>{
    Contact.find()
    .exec((err, contacts)=>{
        if(err){
            return res.status(400).json({
                error: "No contact found"
            })
        }
        res.json(contacts);
    })
}

//update
exports.updateContact = (req, res)=>{
    //creating a form
    let form = new formidable.IncomingForm();
    //form should also include the extensions of the files

    //Now parse the form
    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "problem"
            })
        }

        //updation of the contact
        let contact = req.contact;
        console.log(contact);
        contact = _.extend(contact, fields);
        
        //Now save the contact to the DB
        contact.save((err, contact)=>{
            if(err){
                return res.status(400).json({
                    error: "Updating contact in DB failed"
                })
            }
            res.json(contact);
        })
    })
}

//delete
exports.removeContact = (req, res)=>{
    let contact = req.contact;
    contact.remove((err, contact)=>{
        if(err){
            return res.status(400).json({
                error: "contact can't be deleted"
            })
        }
        res.json({
            message: "contact Successfully deleted",
            contact
        })
    })
}