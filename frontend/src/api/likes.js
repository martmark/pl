import axios from 'axios';

export default {
  likeVideo: function (data) {
    return axios.post(`http://localhost:3000/likes`, { data });
  },
  unlikeVideo: function (data) {
    return axios.delete(`http://localhost:3000/likes`, { data });
  },
  switchLike: function (data) {
    return axios.patch('http://localhost:3000/likes', { data });
  }
}