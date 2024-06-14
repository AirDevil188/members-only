const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Message = require("../models/message");
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
  } else {
    res.render("index"),
      {
        title: "Members Only - Homepage",
      };
  }
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
