const express = require("express");
const db = require("../db/models");
const { Video, Comment, User, Like } = db;
const moment = require('moment');
moment().format();

const router = express.Router();

router.get("/videos", async (req, res) => {

  const videos = await Video.findAll();

  res.json({ videos });
});

router.post("/videos", async (req, res) => {
  let { url, userId } = req.body.data;

  let video = await Video.findOne({ where: { videoUrl: url }});

  let likes = {
    likeCount: 0,
    dislikeCount: 0,
    liked: false,
    disliked: false,
  };

  const comments = [];
  
  if (!video) {
    let newVideo = new Video({
      videoUrl: url,
      playCount: 0
    });
    video = await newVideo.save();
    res.json({ videoId: video.id, comments, likes });
    return;
  }

  let resVideo = await Video.findByPk(video.id, {
    include: [
      {
        model: Comment,
        as: 'comments',
        include: {
          model: User,
          as: 'author'
        }
      },
      {
        model: Like,
        as: 'likes'
      }
    ]
  })

  resVideo.likes.forEach(like => {
    if (like.dislike) {
      likes.dislikeCount++;
      if (userId && like.userId === userId) likes.disliked = true;
    } else {
      likes.likeCount++;
      if (userId && like.userId === userId) likes.liked = true;
    }
  })

  let length = resVideo.comments.length;
  for (let i = length - 1; i >= 0; i--) {
    const { id, body, createdAt, author } = resVideo.comments[i];
    const { fName, lName } = author;
    let timeSince = moment(createdAt).fromNow();
    comments.push({ id, body, createdAt: timeSince, author: `${fName} ${lName}` });
  };

  let resObj = {
    videoId: resVideo.id,
    playCount: resVideo.playCount,
    comments,
    likes
  }

  res.json(resObj);
});

router.post('/videos/:videoId/play', async (req, res) => {
  const { videoId } = req.params;
  
  const video = await Video.findByPk(videoId);

  const playCount = video.playCount + 1;

  video.update({ playCount });

  res.json(playCount);
})

module.exports = router;
