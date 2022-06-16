const router = require('express').Router()
const passport = require("passport");

// Auth related
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));



router.get("/success", (req, res) => {
  res.status(200).json(req.user);
});

router.get("/logout", (req, res) => {
  req.logout(err => {
    return res.status(200).json({})
  })
});

module.exports = router