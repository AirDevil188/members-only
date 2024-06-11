const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.members_only_sign_up_get = asyncHandler((req, res, next) => {
  res.render("members-sign-up", {
    title: "Members Only - Sign Up",
  });
});
