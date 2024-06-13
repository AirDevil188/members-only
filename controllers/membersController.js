const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Message = require("../models/message");
const bcryptjs = require("bcryptjs");
const { validationResult, body } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

exports.members_only_index = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find()
    .sort({ title: 1 })
    .populate("user")
    .exec();

  if (allMessages.length > 0) {
    res.render("index", {
      title: "Members Only - Homepage",
      allMessages: allMessages,
    });
  }
});

exports.members_only_sign_up_get = asyncHandler(async (req, res, next) => {
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

exports.members_only_secret_get = asyncHandler(async (req, res, next) => {
  res.render("members-secret-page", {
    title: "Members Only - Secret Club",
  });
});

exports.members_only_secret_post = asyncHandler(async (req, res, next) => {
  if (req.body.secret_code === process.env.SECRET_CODE) {
    await User.findByIdAndUpdate(res.locals.currentUser, {
      member: true,
    });
    res.redirect("/");
  }
});

exports.members_only_create_message_get = asyncHandler(
  async (req, res, next) => {
    res.render("create-new-message", {
      title: "Members Only - Create New Message",
    });
  }
);

exports.members_only_create_message_post = [
  body("message_title", "Message Title must not be empty.")
    .isLength({ min: 1 })
    .escape(),
  body("message_text", "Message Text must not be empty.")
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("create-new-message", {
        title: "Members Only - Create New Message",
        errors: errors.array(),
      });
      return;
    } else {
      const message = new Message({
        title: req.body.message_title,
        text: req.body.message_text,
        timestamp: Date.now(),
        user: await User.findById(res.locals.currentUser.id),
      });
      await message.save();
      res.redirect("/");
    }
  }),
];
