'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
  question: {
    type: String
  }
});

module.exports = mongoose.model('Survey', SurveySchema);
