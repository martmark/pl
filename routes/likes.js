const express = require("express");
const db = require("../db/models");
const { Video, Comment, User, Like } = db;

const router = express.Router();

router.post('/likes', async (req, res, next) => {
  const { userId, videoId, dislike } = req.body.data;
  
  const like = new Like ({ userId, videoId, dislike });

  try {
    await like.save();
    res.json(like);
  } catch (err) {
    res.status(424);
    next();
  }
})

router.patch('/likes', async (req, res, next) => {
  const { userId, videoId, dislike } = req.body.data;

  const like = await Like.findOne({ where: { userId, videoId } });

  try {
    await like.update({ userId, videoId, dislike });
    res.json(like);
  } catch {
    res.status(424);
    next();
  }

})

router.delete('/likes', async (req, res, next) => {
  const { userId, videoId } = req.body;

  try {
    const like = await Like.findOne({ where: { userId, videoId }});

    if (like) {
      const id = like.id;
      await like.destroy();
      res.json({ id });
    }
  } catch {
    res.status(424);
    next();
  }
})

module.exports = router;