import axios from 'axios';

export default {
  signIn: function (data) {
    return axios.post("http://localhost:3000/google", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      contentType: "application/octet-stream; charset=utf-8",
      processData: false,
      data
    });
  }
}




