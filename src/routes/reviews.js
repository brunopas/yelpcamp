const express = require("express");
const router = express.Router({ mergeParams: true });

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const Campground = require("../models/campground");
const Review = require("../models/review");
const ReviewController = require("../controllers/ReviewController");

router.post(
    "/",
    isLoggedIn,
    validateReview,
    catchAsync(ReviewController.createReview)
);

router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    catchAsync(ReviewController.deleteReview)
);

module.exports = router;
