const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../util/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");
//
router.get("/", (req, res) => {
  res.redirect("/listings");
});
//render signup page
router.get("/signup", userController.renderSignupPage);
//signUp the user
router.post("/signup", wrapAsync(userController.signUpUser));
//render login page
router.get("/login", userController.renderLoginPage);
//login user
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.loginUser
);
//logout user
router.get("/logout", userController.logoutUser);
module.exports = router;
