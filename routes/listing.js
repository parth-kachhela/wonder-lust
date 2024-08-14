const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListings } = require("../middleware.js");
const listingscontroller = require("../controllers/listings.js");
const { reviewSchema, listingsSchema } = require("../schema.js");

// index rout
router.get("/", listingscontroller.index);

//new rout
router.get("/new", isLoggedIn, listingscontroller.addNewlistings);
router.post("/new", isLoggedIn, wrapAsync(listingscontroller.postNewListing));

// show rout
router.get("/:id", wrapAsync(listingscontroller.showlistings));

//edit rout
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingscontroller.editlistings)
);
router.put("/:id", isOwner, wrapAsync(listingscontroller.updatelistings));

//Delete rout
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingscontroller.destroylistings)
);

module.exports = router;
