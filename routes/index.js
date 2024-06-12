const express = require("express");
const router = express.Router();

const membersController = require("../controllers/membersController");
const passport = require("passport");
const user = require("../models/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else req.session.viewCount = 1;
  console.log(req.session);
  res.render("index", { title: "Members Only", user: req.user });
  console.log(req.user);
});

// Sign up GET //

router.get("/sign-up", membersController.members_only_sign_up_get);

// Sign up POST

router.post("/sign-up", membersController.members_only_sign_up_post);

// Log in GET //

router.get("/log-in", membersController.members_only_log_in_get);

// Log in SET //

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

module.exports = router;
