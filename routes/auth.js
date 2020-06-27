const express = require('express');
const axios = require("axios");

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
    await user.save();
  }

  res.json({ fName: user.fName, userId: user.id });

})

module.exports = router;