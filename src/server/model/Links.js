var mongoose = require('mongoose');

var linkSchema = new mongoose.Schema({
  herokuLink: String
});

module.exports = mongoose.model('Link', linkSchema, "link");
