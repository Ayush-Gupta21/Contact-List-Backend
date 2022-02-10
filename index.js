//MADE BY:- Ayush Gupta - 1910990212 - st2
require("dotenv").config();

const express = require("express");
const app = express();
const contactRoutes = require("./routes/contact");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, 
{useNewUrlParser: true}).then(() => {
    console.log("DB connected!!");
})

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", contactRoutes);

app.listen(process.env.PORT || 8000, () => {
    console.log("Good to go!!!");
});