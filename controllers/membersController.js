const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { validationResult, body } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

exports.members_only_sign_up_get = asyncHandler((req, res, next) => {
  res.render("members-sign-up", {
    title: "Members Only - Sign Up",
  });
});

exports.members_only_sign_up_post = [
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body("password", "Password must not be empty.").isLength({ min: 1 }).escape(),

  body("confirm_password", "Password doesn't match").custom(
    (value, { req }) => {
      return value === req.body.password;
    }
  ),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("members-sign-up", {
        title: "Members Only - Sign Up",
        errors: errors.array(),
      });
    } else {
      bcryptjs.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
          const user = new User({
            username: req.body.username,
            password: hashedPassword,
            member: false,
          });
          await user.save();
          res.redirect("/log-in");
        } catch {
          return next(err);
        }
      });
    }
  }),
];

exports.members_only_log_in_get = asyncHandler(async (req, res, next) => {
  res.render("members-log-in", {
    title: "Members Only - Log In",
  });
});

exports.members_only_log_out_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect("/");
    }
  });
});
