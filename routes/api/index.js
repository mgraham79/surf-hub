const router = require("express").Router();
const userRoutes = require("./users");
const sessionRoutes = require("./sessions");
const beachRoutes = require("./beaches");

// User routes
router.use("/users", userRoutes);

// Session routes
router.use("/sessions", sessionRoutes);

// Beach routes
router.use("/beaches", beachRoutes);


module.exports = router;
