const router = require("express").Router();
const userRoutes = require("./users");
const sessionRoutes = require("./sessions");
const beachRoutes = require("./beaches");
const reviewRoutes = require("./reviews");

// User routes
router.use("/users", userRoutes);

// Session routes
router.use("/sessions", sessionRoutes);

// Beach routes
router.use("/beaches", beachRoutes);

// Review routes
router.use("/reviews", reviewRoutes);


module.exports = router;
