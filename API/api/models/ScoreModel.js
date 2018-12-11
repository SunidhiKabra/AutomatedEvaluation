'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
  evaluator: {
    type: String,
    required: 'Kindly enter the username of the evakuatoe'
  },
  exhibit: {
    type: String,
    required: 'Kindly enter the age of the exhibit'
  },
  scores: [{type: String}]
});


module.exports = mongoose.model('Score', ScoreSchema);
