const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.postReviews = async (req, res) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      throw new ExpressError("Listing not found", 404);
    }

    const newReviewData = { ...req.body.reviews };
    const newReview = new Review(newReviewData);
    newReview.author = req.user._id;
    console.log(newReview);
    await newReview.save();
    listing.review.push(newReview._id);
    await listing.save();

    req.flash("success", "Review added!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports.deletereviews = async (req, res) => {
  const { id, reviewId } = req.params;

  const listing = await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  if (!listing) {
    throw new ExpressError("Listing not found", 404);
  }

  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted!");
  res.redirect(`/listings/${id}`);
};
