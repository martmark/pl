const express = require('express');
const axios = require("axios");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

const db = require("../db/models");
const { User } = db;

const router = express.Router();

router.post('/google', async (req, res, next) => {
  const idToken = req.body.data.wc.id_token;

  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`
  );

  const { given_name, family_name, email } = data;
  
  let user = await User.findOne({ where: { email }});

  if (!user) {
    user = new User ({ fName: given_name, lName: family_name, email: email });
    try {
      await user.save();
    } catch {
      res.status(424);
      next();
      return;
    }
  }

  const payload = { fName: user.fName, userId: user.id };
  
  jwt.sign(
    payload,
    keys.secretOrKey,
    // Tell the key to expire in one hour
    { expiresIn: 3600 },
    (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token,
      });
    }
  );

})

module.exports = router;