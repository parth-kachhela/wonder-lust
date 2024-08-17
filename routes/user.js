const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const controllerUser = require("../controllers/user.js");

router.get("/signup", controllerUser.singupforms);

router.post("/signup", wrapAsync(controllerUser.postSignup));

router.get("/login", controllerUser.login);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  controllerUser.postlogin
);

router.get("/logout", controllerUser.logout);
module.exports = router;
