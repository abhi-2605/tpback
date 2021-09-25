const mongoose = require("mongoose");
var bcrypt = require('bcrypt')

// connect to cloud Database


const uri = "mongodb+srv://tsib1:Qwerty2605@cluster0.ajl7g.mongodb.net/MDATA?retryWrites=true&w=majority";
mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("db connected1")
    })
    .catch(err => console.log(err))

// create Schema
const Schema = mongoose.Schema;

// define Schema structure for an user account
const movies = new Schema({

    name: String,
    genre: String,
    year: String,
    director: String,
    plot: String

});


var moviesdata = mongoose.model("newmovie", movies);


module.exports = moviesdata;