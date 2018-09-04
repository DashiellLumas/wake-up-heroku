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
var CONNECTIONDETAILS = process.env.connectionString;
mongoose.connect(CONNECTIONDETAILS, function(err, database) {
  if (err)
    throw err;
  else {
    db = database;
    console.log('Connected to mongoDB');
  }
}).then(() => console.log('connection successful')).catch((err) => console.log(err));
mongoose.Promise = global.Promise;
const PORT = process.env.PORT || 8082;

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

function getHerokuPage(herokuLink){
  console.log("boogie ==>", herokuLink)
  setInterval(()=> {
    console.log(herokuLink);
   axios.get(`https://${herokuLink}.herokuapp.com`)
   .then((res) => {
     console.log(res.data);
   })
 },300000)

}

function keepHerokuAppsAwake() {
  Link.find(function(err, links) {
    if (err) {
      return next(err);
    } else {
        let herokuLinks = JSON.parse(JSON.stringify(links));
        Object.keys(herokuLinks).map((link,key) => {
          let herokuLink = herokuLinks[key].link;
          getHerokuPage(herokuLink);
        });
      }

    })
}
keepHerokuAppsAwake();

app.listen(PORT, () => {
  console.log("application listening on port:", PORT);
})
