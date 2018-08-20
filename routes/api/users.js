const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router
  .route("/")
  .get(usersController.findAll)
  .post(usersController.create);

// Matches with "/api/users/:id/:updateField"
router.route("/:id/:updateField").put(usersController.update);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(usersController.findById)
  .delete(usersController.remove);

module.exports = router;
