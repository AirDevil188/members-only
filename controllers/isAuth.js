const asyncHandler = require("express-async-handler");

const isAuth = asyncHandler(async (req, res, next) => {
  if (res.locals.currentUser) {
    return next();
  }
  res.render("auth", {
    title: "Members Only",
  });
});

module.exports = isAuth;
