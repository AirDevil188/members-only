const express = require("express");
const router = express.Router();

const membersController = require("../controllers/membersController");
const passport = require("passport");
const user = require("../models/user");

/* GET home page. */
router.get("/", membersController.members_only_index);

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

// Log out GET //
router.get("/log-out", membersController.members_only_log_out_get);

// Secret GET //
router.get("/cats", membersController.members_only_secret_get);

// Secret POST //
router.post("/cats", membersController.members_only_secret_post);

// Create Message GET //
router.get(
  "/create-message",
  membersController.members_only_create_message_get
);

// Create Message POST //
router.post(
  "/create-message",
  membersController.members_only_create_message_post
);

// Admin GET //
router.get("/admin", membersController.members_only_admin_get);

// Admin POST //
router.post("/admin", membersController.members_only_admin_post);

module.exports = router;
