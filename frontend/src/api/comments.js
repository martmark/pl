import axios from 'axios';

export default {
  addComment: function (data) {
    return axios.post('http://localhost:3000/comments', {
      data
    })
  }
};