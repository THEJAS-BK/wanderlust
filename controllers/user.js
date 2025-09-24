const User = require("../models/user");
//render signup page
module.exports.renderSignupPage = (req, res) => {
  res.render("users/signup.ejs");
};
// signup the user
module.exports.signUpUser = async (req, res) => {
  try {
    let { username, password, email } = req.body;
    const newUser = new User({ email, username });
    const registerdUser = await User.register(newUser, password);
    req.login(registerdUser, (err) => {
      if (err) {
        next(err);
      }
      req.flash("Success", "Welcome to wanderlust");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("failure", err.message);
    res.redirect("/signup");
  }
};
//render login page
module.exports.renderLoginPage = (req, res) => {
  res.render("users/login.ejs");
};
//login user
module.exports.loginUser = async (req, res) => {
  req.flash("Success", "Welcome to Wanderlust, you have logged in!!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
//logout the user
module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("Success", "You have logged out successfully");
    res.redirect("/listings");
  });
};
