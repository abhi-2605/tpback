const express = require('express');
const bodyParser = require('body-parser');
var app = new express()
const cors = require('cors');
var path = require('path');
app.use(cors());
var jwt = require('jsonwebtoken');
require('dotenv').config()
app.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
// const movies = require("../backend/src/model/movie.js");
const register = require('../backend/src/model/reguser')
const newmovie = require('../backend/src/model/addmovie')
const movie = require('../backend/src/model/movie');
const msg = require('../backend/src/model/msg')
    // app.get('/', (req, res) => {
    //     res.send('hi')
    // })

var url = "mongodb+srv://tsib1:Qwerty2605@cluster0.ajl7g.mongodb.net/MDATA?retryWrites=true&w=majority";




app.get('/home', (req, res) => {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("MDATA");
            //Find the first document in the customers collection:


            dbo.collection("movie").find({}).toArray(function(err, result) {
                if (err) throw err;
                res.send(result)
                console.log(result)
            });
        });
    })
    // movieId: { $lt: 21 }

app.post('/register', function(req, res) {
    res.header('Access-Control-Allow-Origin', "*") // use of this that from any orgin u are getting the request of productapp then u they can acess
    res.header('Access-Control-Allow-Methds : GET , POST, PATCH , PUT ,DELETE ,OPTIONS');
    console.log(req.body);

    var data1 = {
        name: req.body.data.name,
        email: req.body.data.email,
        pass: register.hashPassword(req.body.data.pass),
        num: req.body.data.num,
        role: req.body.data.role,
        userrole: req.body.data.userrole
    }


    let promise = register.findOne({ email: req.body.data.email })

    promise.then(function(doc) {
        if (doc) {
            res.json({ msg: "already there" })
        } else {
            var data = new register(data1);
            res.json({ msg: "suc" })
            data.save();
        }
    });


});

app.post('/login', function(req, res, next) {
    let promise = register.findOne({ email: req.body.data.email })

    promise.then(function(doc) {
        if (doc) {
            if (doc.isValid(req.body.data.pass)) {
                let token = jwt.sign({ role: doc.role }, 'secret', { expiresIn: '5h' });
                console.log(doc.role)
                return res.status(200).json(token)
            } else {
                let abc = "Invalid password"
                res.json(abc);
            }
        } else {
            let abc = "User not resgistered"
            res.json(abc);
        }
    });
})

app.get('/username', verifyToken, function(req, res, next) {
    return res.status(200).json(decodedToken.role);
})

var decodedToken = '';

function verifyToken(req, res, next) {
    let token = req.query.token;

    jwt.verify(token, 'secret', function(err, tokendata) {
        if (err) {
            return res.json({ message: ' Unauthorized request' });
        }
        if (tokendata) {
            decodedToken = tokendata;
            next();
        }
    })
}



app.post('/addmovie', function(req, res) {
    res.header('Access-Control-Allow-Origin', "*") // use of this that from any orgin u are getting the request of productapp then u they can acess
    res.header('Access-Control-Allow-Methds : GET , POST, PATCH , PUT ,DELETE ,OPTIONS');
    console.log(req.body);

    var data1 = {
        name: req.body.data.name,
        email: req.body.data.email,
        genre: req.body.data.genre,
        year: req.body.data.year,
        director: req.body.data.director,
        plot: req.body.data.plot
    }





    var data = new newmovie(data1);

    data.save();


});
app.get('/review/:id', (req, res) => {
    let id = req.params.id

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("MDATA");
        //Find the first document in the customers collection:


        dbo.collection('movie').findOne({ title: id }).then(function(doc) {
            if (doc) {
                res.send(doc)
                console.log(doc)
            } else {
                console.log(id)

            }
        })
    });





})

app.post('/sendmsg', function(req, res) {
    res.header('Access-Control-Allow-Origin', "*") // use of this that from any orgin u are getting the request of productapp then u they can acess
    res.header('Access-Control-Allow-Methds : GET , POST, PATCH , PUT ,DELETE ,OPTIONS');
    console.log(req.body);

    var data1 = {
        id: req.body.data.id,
        msg: req.body.data.msg
    }





    var data = new msg(data1);

    data.save();


});


app.post('/getmsg', function(req, res, next) {


    msg.find({ id: req.body.data.id }).then(function(doc) {
        if (doc) {
            res.send(doc)
            console.log(doc)
        } else {
            console.log(id)

        }
    })
})


app.listen(process.env.PORT || 2222)