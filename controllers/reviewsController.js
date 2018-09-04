const db = require("../models");

// Defining methods for the reviewsController
module.exports = {
  findAll: function(req, res) {
    db.Review
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Review
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByReviewerID: function(req, res){
    db.Review
      .find({reviewerID:req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByReviewerIDStudent: function(req, res){
    db.Review
      .find({reviewerID:req.params.id, reviewerInstructor:false})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByReviewerIDInstructor: function(req, res){
    db.Review
      .find({reviewerID:req.params.id, reviewerInstructor:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByRevieweeID: function(req, res){
    db.Review
      .find({revieweeID:req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByRevieweeIDStudent: function(req, res){
    db.Review
      .find({revieweeID:req.params.id, revieweeInstructor:false})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByRevieweeIDInstructor: function(req, res){
    db.Review
      .find({revieweeID:req.params.id, revieweeInstructor:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByRevieweeIDStudentByInstructors: function(req, res){
    db.Review
      .find({revieweeID:req.params.id, revieweeInstructor:false, reviewerInstructor:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByRevieweeIDInstructorByStudents: function(req, res){
    db.Review
      .find({revieweeID:req.params.id, revieweeInstructor:true, reviewerInstructor:false})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Review
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    let updateReviewObject = {};

    if (req.body.reviewerName) updateReviewObject.reviewerName = req.body.reviewerName;
    if (req.body.reviewerID) updateReviewObject.reviewerID = req.body.reviewerID;
    if (req.body.reviewerInstructor) updateReviewObject.reviewerInstructor = req.body.reviewerInstructor;
    if (req.body.revieweeName) updateReviewObject.revieweeName = req.body.revieweeName;
    if (req.body.revieweeID) updateReviewObject.revieweeID = req.body.revieweeID;
    if (req.body.revieweeInstructor) updateReviewObject.revieweeInstructor = req.body.revieweeInstructor;
    if (req.body.reviewText) updateReviewObject.reviewText = req.body.reviewText;
    if (req.body.reviewRating) updateReviewObject.reviewRating = req.body.reviewRating;
    if (req.body.reviewDate) updateReviewObject.reviewDate = req.body.reviewDate;
    if (req.body.sessionDateForReview) updateReviewObject.sessionDateForReview = req.body.sessionDateForReview;


    db.Review.findOneAndUpdate({ _id: req.params.id }, updateReviewObject, {
      new: true
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Review
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};