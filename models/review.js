const mongoose = require("mongoose");
const validators = require("mongoose-validators");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
 
  reviewerName: {
    type: String,
    trim: true
  },

  reviewerID: {
    type: String,
    trim: true
  },

  reviewerInstructor:{
    type: Boolean,
    default: false
  },

  revieweeName: {
    type: String,
    trim: true   
  },

  revieweeID: {
    type: String,
    trim: true  
  },

  revieweeInstructor:{
    type: Boolean,
    default: true
  },

  reviewText: {
    type: String,
    trim: true   
  },

  reviewRating: {
    type: Number
  }

});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
