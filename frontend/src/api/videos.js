import axios from 'axios';

export default {
  fetchVideos: function() {
    return axios.get("http://localhost:3000/videos/");
  },
  getVideoData: function(url, userId) {
    return axios.post(`http://localhost:3000/videos/`, {
      data: { url, userId }
    });
  },
  likeVideo: function({ userId, videoId }) {
    return axios.post(`http://localhost:3000/videos/${videoId}/like`, {
      data: { userId },
    });
  },
  dislikeVideo: function({ userId, videoId }) {
    return axios.post(`http://localhost:3000/videos/${videoId}/dislike`, {
      data: { userId },
    });
  },
  logPlay: function (videoId) {
    return axios.post(`http://localhost:3000/videos/${videoId}/play`);
  }
};