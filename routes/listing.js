const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListings } = require("../middleware.js");
const listingscontroller = require("../controllers/listings.js");
const { reviewSchema, listingsSchema } = require("../schema.js");

// index rout
router.get("/", listingscontroller.index);

router
  .route("/new")
  .get(isLoggedIn, listingscontroller.addNewlistings)
  .post(isLoggedIn, wrapAsync(listingscontroller.postNewListing));

// show rout

router
  .route("/:id")
  .get(wrapAsync(listingscontroller.showlistings))
  .delete(isLoggedIn, isOwner, wrapAsync(listingscontroller.destroylistings))
  .put(isOwner, wrapAsync(listingscontroller.updatelistings));

//edit rout
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingscontroller.editlistings)
);

//Delete rout

module.exports = router;
