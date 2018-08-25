const mongoose = require("mongoose");
const validators = require("mongoose-validators");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
 
  clientName: {
    type: String,
    trim: true
  },

  clientID: {
    type: String,
    trim: true
  },

  instructorName: {
    type: String,
    trim: true   
  },

  instructorID: {
    type: String,
    trim: true  
  },

  sessionStart: {
    type: Date
  },

  sessionEnd: {
    type: Date
  },

  ended:{
    type: Boolean,
    default: false
  }

});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
