const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync");
const { isLoggedIn } = require("../middleware.js");
const { isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.create)
  ); //create a listing

router.get("/new", isLoggedIn, listingController.showNewPage);
//show route
router.get("/:id", wrapAsync(listingController.showListing));
//update route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,

  wrapAsync(listingController.showUpdatePage)
);
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  upload.single("listing[image]"),
  wrapAsync(listingController.update)
);
//delete `route`
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deletePage)
);

module.exports = router;
