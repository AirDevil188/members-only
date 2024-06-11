const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.members_only_sign_up_get = asyncHandler((req, res, next) => {
  res.render("members-sign-up", {
    title: "Members Only - Sign Up",
  });
});

exports.members_only_sign_up_post = asyncHandler(async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.username_password,
      member: false,
    });
    await user.save();
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});
