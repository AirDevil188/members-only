const express = require("express");
const router = express.Router();

const membersController = require("../controllers/membersController");
const usersController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

const passport = require("passport");
const isAuth = require("../controllers/isAuth");

/* GET home page. */
router.get("/", membersController.members_only_index);

// Sign up GET //

router.get("/sign-up", usersController.users_only_sign_up_get);

// Sign up POST

router.post("/sign-up", usersController.users_only_sign_up_post);

// Log in GET //

router.get("/log-in", usersController.users_only_log_in_get);

// Log in SET //

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// Log out GET //
router.get("/log-out", usersController.users_only_log_out_get);

// Secret GET //
router.get("/cats", isAuth, membersController.members_only_secret_get);

// Secret POST //
router.post("/cats", membersController.members_only_secret_post);

// Create Message GET //
router.get(
  "/create-message",
  isAuth,
  usersController.users_only_create_message_get
);

// Create Message POST //
router.post("/create-message", usersController.users_only_create_message_post);

// Delete Message GET //
router.get("/message/:id/delete", adminController.admin_only_delete_get);

// Admin GET //
router.get("/admin", isAuth, adminController.admin_only_admin_get);

// Admin POST //
router.post("/admin", adminController.admin_only_admin_post);

module.exports = router;
