const Listing = require("./models/listing");
const Review = require("./models/review.js");
const ExpressError = require("./util/ExpressError");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema");
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Your not logged in");
    return res.redirect("/login");
  }
  next();
};
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let test = await Listing.findById(id);
  console.log("Isowner:", test);
  console.log("test.owner:", test.owner);
  console.log("currentUser:", res.locals.currentUser);

  if (
    !test ||
    !test.owner ||
    !test.owner._id.equals(res.locals.currentUser._id)
  ) {
    req.flash("error", "You are not authorized to do that");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details[0].message;
    next(new ExpressError(500, "Internal server error"));
  }
  next();
};
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details[0].message;
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let test = await Review.findById(reviewId);
  if (!res.locals.currentUser) {
    req.flash("error", "Please login to do that");
    return res.redirect(`/listings/${id}`);
  }
  if (
    !test ||
    !test.author ||
    !test.author.equals(res.locals.currentUser._id)
  ) {
    req.flash("error", "You are not allowed to do that");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
