const passport = require("passport");
const express = require('express');
const db = require('../db/models');
const { User } = db;

const router = express.Router();

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "Success" });
  }
);

module.exports = router;