const mongoose = require("mongoose");


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
const msg = new Schema({
    id: '',
    msg: ''

});


var msgdata = mongoose.model("msg", msg);


module.exports = msgdata;