const db = require("../models");

// Defining methods for the beachesController
module.exports = {
  findAll: function(req, res) {
    db.Beach
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Beach
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Beach
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    let updateBeachObject = {};

    if (req.body.beachName) updateBeachObject.beachName = req.body.beachName;
    if (req.body.beachloc) updateBeachObject.beachloc = req.body.beachloc;

    db.Beach.findOneAndUpdate({ _id: req.params.id }, updateBeachObject, {
      new: true
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Beach
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};