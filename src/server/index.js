const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: "*/*"}));
require('dotenv').config();
const axios = require('axios');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wake_heroku', function(err, database) {
  if (err)
    throw err;
  else {
    db = database;
    console.log('Connected to mongoDB');
  }
}).then(() => console.log('connection successful')).catch((err) => console.log(err));
mongoose.Promise = global.Promise;
const PORT = process.env.PORT || 8080;

var Link = require('./model/Links.js');

app.post('/api/herokuLinks', function(req, res, next) {
  db.collection('link').insert(req.body, function(err, result) {
    if (err)
      res.send('Error');
    else {
      res.send('Success');
    }
  })
});

app.get('/api/herokuLinks', function(req, res, next) {
  Link.find(function(err, links) {
    if (err) {
      return next(err);
    } else {
      res.json(links);
    }

  })
});

app.listen(PORT, () => {
  console.log("application listening on port:", PORT);
})
