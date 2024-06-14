const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Message = require("../models/message");
const dotenv = require("dotenv");

dotenv.config();

exports.admin_only_admin_get = asyncHandler(async (req, res, next) => {
  res.render("admin-log-in", {
    title: "Members Only - Admin Club",
  });
});

exports.admin_only_admin_post = asyncHandler(async (req, res, next) => {
  if (req.body.admin_code === process.env.ADMIN_CODE) {
    await User.findByIdAndUpdate(res.locals.currentUser, {
      member: true,
      admin: true,
    });
    res.redirect("/");
  }
});

exports.admin_only_delete_get = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (message === null) {
    const err = new Error("Message was not found.");
    err.status = 404;
    return next(err);
  }
  await Message.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
