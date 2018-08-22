const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const axios = require("axios");

const db = require("./models");

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



// Connect to the Mongo DB
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/surfHub");
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/surfHub', { useNewUrlParser: true });

const isAuthenticated = exjwt({
  secret: 'surfs up moondoggies'
});

// LOGIN ROUTE
app.post('/api/login', (req, res) => {
  db.User.findOne({
    email: req.body.email
  }).then(user => {
    user.verifyPassword(req.body.password, (err, isMatch) => {
      if(isMatch && !err) {
        let token = jwt.sign({ id: user._id, email: user.email }, 'surfs up moondoggies', { expiresIn: 129600 }); // Sigining the token
        res.json({success: true, message: "Token Issued!", token: token, user: user});
      } else {
        res.status(401).json({success: false, message: "Authentication failed. Wrong password."});
      }
    });
  }).catch(err => res.status(404).json({success: false, message: "User not found", error: err}));
});

// SIGNUP ROUTE
app.post('/api/signup', (req, res) => {
  db.User.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

// Any route with isAuthenticated is protected and you need a valid token
// to access
app.get('/api/user/:id', isAuthenticated, (req, res) => {
  db.User.findById(req.params.id).then(data => {
    if(data) {
      res.json(data);
    } else {
      res.status(404).send({success: false, message: 'No user found'});
    }
  }).catch(err => res.status(400).send(err));
});

app.get("/api/proxy/beaches", (req, res)=>{
  axios.get("http://api.spitcast.com/api/spot/all")
    .then(responseData => {
      res.json(responseData.data);
    }).catch(err => {
      res.status(400).json(err);
    });
})


// Add routes, both API and view
app.use(routes);

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
 