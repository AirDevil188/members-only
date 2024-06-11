const express = require("express");
const router = express.Router();

const membersController = require("../controllers/membersController");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else req.session.viewCount = 1;
  console.log(req.session);
  res.render("index", { title: "Members Only" });
});

// Sign up GET //

router.get("/sign-up", membersController.members_only_sign_up_get);

router.post("/sign-up", membersController.members_only_sign_up_post);

module.exports = router;
