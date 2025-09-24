const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../util/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewConroller = require("../controllers/reviews");
// create review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewConroller.createReview)
);
//delete review
router.delete(
  "/:reviewId",
  isReviewAuthor,
  isLoggedIn,
  wrapAsync(reviewConroller.deleteReview)
);
module.exports = router;
