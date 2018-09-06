const mongoose = require("mongoose");
const validators = require("mongoose-validators");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
 
  reviewerID: {
    type: String,
    trim: true
  },

  revieweeID: {
    type: String,
    trim: true  
  },

  reviewText: {
    type: String,
    trim: true   
  },

  reviewRating: {
    type: Number
  },

  reviewDate: {
    type: Date
  },

  sessionDateForReview: {
    type: Date
  },

});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
