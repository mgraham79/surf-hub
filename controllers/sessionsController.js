const db = require("../models");

// Defining methods for the sessionsController
module.exports = {
  findAll: function(req, res) {
    db.Session
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Session
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByInstructor: function(req, res){
    db.Session
      .findOne({instructorID:req.params.id, ended:false})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Session
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    let updateSessionObject = {};

    if (req.body.clientName) updateSessionObject.clientName = req.body.clientName;
    if (req.body.clientID) updateSessionObject.clientID = req.body.clientID;
    if (req.body.instructorName) updateSessionObject.instructorName = req.body.instructorName;
    if (req.body.instructorID) updateSessionObject.instructorID = req.body.instructorID;
    if (req.body.sessionStart) updateSessionObject.sessionStart = req.body.sessionStart;
    if (req.body.sessionEnd) updateSessionObject.sessionEnd = req.body.sessionEnd;
    if (req.body.ended) updateSessionObject.ended= req.body.ended;
    if (req.body.sessionLoc) updateSessionObject.sessionLoc= req.body.sessionLoc;

    db.Session.findOneAndUpdate({ _id: req.params.id }, updateSessionObject, {
      new: true
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Session
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};