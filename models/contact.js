//MADE BY:- Ayush Gupta - 1910990212 - st2

const mongoose = require("mongoose");

var contactSchema = new mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        type: Number,
        unique: true,
        dropDups: true
    },
    email: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model("Contact", contactSchema);