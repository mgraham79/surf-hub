const mongoose = require("mongoose");
const validators = require("mongoose-validators");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let userSchema = new Schema({
 
  // username: {
  //   type: String,
  //   trim: true,
  //   required: "Username is Required",
  //   unique: true
  // },

  firstName: {
    type: String,
    trim: true,
    required: "First name is Required"
  },

  lastName: {
    type: String,
    trim: true,
    required: "Last name is Required"
  },

  middleInitial: {
    type: String,
    trim: true,
    validate: [
      function(input) {
        return input.length <= 1;
      },
      "Enter only One letter for middle initial."
    ]
  },
  
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    unique: true
  },

  email: {
    type: String,
    trim: true,
    validate: validators.isEmail()
  },

  picURL: {
    type: String,
    trim: true,
    validate: validators.isURL()
  },

  location: {
    type: String
  },

  exp: {
    type: String,
    trim: true
  },

  ratingsAll: [{
    type: Number
  }],

  reviewsAll: [{
    type: String,
    trim: true
  }],

  board: {
    type: String,
    trim: true
  },

  available: {
    type: Boolean,
    default: false
  },

  bio: {
    type: String,
    trim: true
  },

  favBeaches: {
    type: String,
    trim: true
  },

  reserved: {
    type: Boolean,
    default: false
  },

  instructor: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

// Execute before each user.save() call
userSchema.pre('save', function(callback) {
  let user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

userSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
