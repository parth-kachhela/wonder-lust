const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

module.exports.addNewlistings = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.postNewListing = async (req, res) => {
  try {
    //console.log(req.body);
    const newListingData = { ...req.body.listing };
    if (!newListingData.image) {
      newListingData.image =
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"; // Set your default image URL here
    }
    const addNew = new Listing(newListingData);
    //here add a new lilt with a new owner
    addNew.owner = req.user._id;
    console.log(addNew);
    await addNew.save();
    req.flash("success", "listing added..!");
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
  }
};

module.exports.showlistings = async (req, res) => {
  let { id } = req.params;
  let listings = await Listing.findById(id)
    //here we can poputatele the reviews and ower for get all the data in it
    .populate("review")
    .populate("owner");

  if (!listings) {
    req.flash("error", "your listing is not available");
    res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listings });
};

module.exports.editlistings = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  res.render("./listings/edit.ejs", { listing });
};

module.exports.updatelistings = async (req, res) => {
  let { id } = req.params;
  const updatedData = { ...req.body.listings };
  if (!updatedData.image) {
    updatedData.image =
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"; // Set your default image URL here
  }
  await Listing.findByIdAndUpdate(id, updatedData);
  req.flash("success", "listing edit..!");
  res.redirect("/listings");
};

module.exports.destroylistings = async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findByIdAndDelete(id);
  console.log(list);
  req.flash("success", "listing deleted..!");
  res.redirect("/listings");
};

//het jdls;vjs;ldj
