const router = require("express").Router();
const beachesController = require("../../controllers/beachesController");

// Matches with "/api/beaches"
router.route("/")
  .get(beachesController.findAll)
  .post(beachesController.create);

// Matches with "/api/beaches/:id"
router
  .route("/:id")
  .get(beachesController.findById)
  .put(beachesController.update)
  .delete(beachesController.remove);

module.exports = router;
