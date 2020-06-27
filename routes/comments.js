const express = require('express');
const moment = require('moment');
moment().format();

const db = require('../db/models');
const { Comment, User } = db;

const router = express.Router();

router.post('/comments', async (req, res, next) => {
  const { videoId, userId, body } = req.body.data;
  
  const newComment = new Comment({
    videoId,
    userId,
    body
  });

  if (body.length < 1) {
    res.status(424);
    next();
  }

  try {
    let comment = await newComment.save();
    const author = await User.findByPk(comment.userId);

    const { fName, lName } = author;
    
    const resObj = {
      id: comment.id,
      createdAt: moment(comment.createdAt).fromNow(),
      author: fName + ' ' + lName,
      body: comment.body
    }
    
    res.json(resObj);
  } catch(err) {
    res.status(424);
    next();
  }
});

module.exports = router;