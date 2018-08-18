const mongoose = require("mongoose");
const validators = require("mongoose-validators");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now },

  username: {
    type: String,
    trim: true,
    required: "Username is Required",
    unique: true
  },

  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    unique: true
  },

  picURL: {
    type: String,
    trim: true,
    validate: validators.isURL()
  },

  location: [{
    lat: {
      type: String
    }, 
    lng: {
      type: String
    }
  }],

  exp: {
    type: String,
    trim: true,
  },

  rating: {
    type: Number
  },

  board: {
    type: String,
    trim: true,
  },

  available: {
    type: Boolean,
    default: false
  },

  bio: {
    type: String,
    trim: true,
  },

  favBeaches: {
    type: String,
    trim: true,
  },

  reserved: {
    type: Boolean,
    default: false
  },

  instructor: {
    type: Boolean,
    default: false
  },

});

const User = mongoose.model("User", userSchema);

module.exports = User;
