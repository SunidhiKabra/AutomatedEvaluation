'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
  patient_name: {
    type: String,
    required: 'Kindly enter the name of the Patient'
  },
  age: {
    type: String,
    required: 'Kindly enter the age of the Patient'
  },
  weight: {
    type: String,
    required: 'Kindly enter the weight of the Patient'
  },
  address: {
    type: String,
    required: 'Kindly enter the address of the Patient'
  },
  username: {
    type: String,
    required: 'Kindly enter the username of the Patient'
  },
  password: {
    type: String,
    required: 'Kindly enter the password of the Patient'
  },
  phone: {
    type: String,
    required: 'Kindly enter the phone mnumber of the Patient'
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  }
});


module.exports = mongoose.model('Patient', PatientSchema);
