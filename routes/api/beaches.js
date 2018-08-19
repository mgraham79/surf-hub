const router = require("express").Router();
const beachesController = require("../../controllers/beachesController");

// Matches with "/api/beaches"
router
  .route("/")
  .get(beachesController.findAll)
  .post(beachesController.create);

// Matches with "/api/users/:id/:updateField"
router.route("/:id/:updateField").put(beachesController.update);

// Matches with "/api/beaches/:id"
router
  .route("/:id")
  .get(beachesController.findById)
  .delete(beachesController.remove);

module.exports = router;
