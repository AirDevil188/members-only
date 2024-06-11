const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { validationResult, body } = require("express-validator");

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

  body("user_password", "Password must not be empty.")
    .isLength({ min: 1 })
    .escape(),

  body("user_confirm_password", "Password doesn't match").custom(
    (value, { req }) => {
      return value === req.body.user_password;
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
      bcryptjs.hash(req.body.user_password, 10, async (err, hashedPassword) => {
        try {
          const user = new User({
            username: req.body.username,
            password: hashedPassword,
            member: false,
          });
          await user.save();
          res.redirect("/");
        } catch {
          return next(err);
        }
      });
    }
  }),
];
