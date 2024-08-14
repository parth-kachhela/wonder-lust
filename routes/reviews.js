const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, validateReviews } = require("../middleware.js");
const reviewscontrollers = require("../controllers/reviews.js");

// Route to add a review
router.post(
  "/",
  isLoggedIn,
  validateReviews,
  wrapAsync(reviewscontrollers.postReviews)
);

// Route to delete a review
router.delete("/:reviewId", wrapAsync(reviewscontrollers.deletereviews));

module.exports = router;
