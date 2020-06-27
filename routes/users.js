const express = require('express');
const db = require('../db/models');
const { User } = db;

const router = express.Router();

router.post('/users', async (req, res, next) => {
  const { fName, lName, email, oauthId } = req.body;

  const user = await User.findOne({ where: { oauthId: oauthId }});

  if (user) {
    res.json({ fName: user.fName, userId: user.id });
    return;
  }

  const newUser = new User({
    fName,
    lName,
    email,
    oauthId
  });

  try {
    await newUser.save();
    res.json({ fName: newUser.fName, userId: newUser.id });
  } catch(err) {
    res.status(424);
    next();
  }
})

module.exports = router;