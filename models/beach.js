const mongoose = require("mongoose");
const validators = require("mongoose-validators");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const beachSchema = new Schema({

  beachName: {
    type: String,
    trim: true
  },

  beachloc: {
    lat: {
      type: Number
    }, 
    lng: {
      type: Number
    }
  }

});

const Beach = mongoose.model("Beach", beachSchema);

module.exports = Beach;
