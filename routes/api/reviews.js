const router = require("express").Router();
const reviewsController = require("../../controllers/reviewsController");

// Matches with "/api/reviews"
router
  .route("/")
  .get(reviewsController.findAll)
  .post(reviewsController.create);

// Matches with "/api/reviews/reviewer/:id"
router
  .route("/reviewer/:id")
  .get(reviewsController.findByReviewerID);

// Matches with "/api/reviews/reviews/:id"
router
  .route("/reviews/:id")
  .get(reviewsController.findByRevieweeID);


// Matches with "/api/reviews/reviewerStudent/:id"
router
  .route("/reviewerStudent/:id")
  .get(reviewsController.findByReviewerIDStudent);

// Matches with "/api/reviews/reviewerInstructor/:id"
router
  .route("/reviewerInstructor/:id")
  .get(reviewsController.findByReviewerIDInstructor);

// Matches with "/api/reviews/studentReviews/:id"
// Reviews of Students by Instructors
router
  .route("/studentReviews/:id")
  .get(reviewsController.findByRevieweeIDStudentByInstructors);

// Matches with "/api/reviews/instructorReviews/:id"
// Reviews of Instructors by Students
router
  .route("/instructorReviews/:id")
  .get(reviewsController.findByRevieweeIDInstructorByStudents);

// Matches with "/api/reviews/:id"
router
  .route("/:id")
  .get(reviewsController.findById)
  .delete(reviewsController.remove)
  .put(reviewsController.update);

module.exports = router;
