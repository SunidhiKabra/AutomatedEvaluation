'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: 'Kindly enter the username of the user'
  },
  password: {
    type: String,
    default:'project'

  },
  role: {
    type: String,
    enum: ['ADMIN', 'EXHIBIT','EVALUATOR'],
    default:'ADMIN'
  }
});


module.exports = mongoose.model('Us', UserSchema);
