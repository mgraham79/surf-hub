const mongoose = require("mongoose");
const validators = require("mongoose-validators");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
 
  clientName: {
    type: String,
    trim: true
  },

  instructorName: {
    type: String,
    trim: true   
  },

  sessionStart: {
    type: Date
  },

  sessionEnd: {
    type: Date
  },

});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
