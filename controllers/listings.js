const Listing = require("../models/listing");
//get index page
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};
//get new listing form
module.exports.showNewPage = (req, res) => {
  res.render("listings/new.ejs");
};
//show indiviual listing
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: "author" })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Page has been deleted");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};
//create a new listing
module.exports.create = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let listing = req.body.listing;
  console.log(listing.location);
  let lat, long;
  await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${listing.location}`
  )
    .then((res) => res.json())
    .then((data) => {
      lat = data[0].lat;
      long = data[0].lon;
    })
    .catch((err) => {
      console.log("this is a error\n", err);
    });
  const newListing = new Listing(listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = {
    type: "Point",
    coordinates: [parseFloat(long), parseFloat(lat)],
  };
  await newListing.save();
  req.flash("Success", "New listing created");
  res.redirect("/listings");
};
//get the update listing page
module.exports.showUpdatePage = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "this page does not exist");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl.replace("/upload", "/upload/,w_350");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};
//update the listings post req
module.exports.update = async (req, res) => {
  if (!req.body.listing) {
    new ExpressError(400, "send valid data");
  }
  let { id } = req.params;
  let listing = req.body.listing;
  listing = await Listing.findByIdAndUpdate(id, listing);
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("Success", "Updated Successfully");
  res.redirect(`/listings/${id}`);
};
//delete the listing
module.exports.deletePage = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("Success", "Deleted successfully");
  res.redirect("/listings");
};
