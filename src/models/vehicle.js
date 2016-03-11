'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var vehicleSchema = new Schema({
  model: String,
  number: String,
  engineNumber: String,
  year: Number,
  color: String,
  isActive: Boolean
});

module.exports = mongoose.model('Vehicle', vehicleSchema);