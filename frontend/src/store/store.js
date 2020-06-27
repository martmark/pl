import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: null,
    currentUser: null,
    currentVideoUrl: null,
    currentVideoId: null,
    playCount: 0,
    likes: null,
    comments: null
  },
  mutations: {
    receiveVideos(state, videos) {
      state.videos = videos;
    },
    receiveCurrentUser(state, user) {
      state.currentUser = user;
    },
    receiveCurrentVideoUrl(state, url) {
      state.currentVideoUrl = url;
    },
    receiveCurrentVideoId(state, videoId) {
      state.currentVideoId = videoId;
    },
    receiveLikes(state, likes) {
      state.likes = likes;
    },
    receiveComments(state, comments) {
      state.comments = comments;
    },
    receiveComment(state, comment) {
      state.comments.unshift(comment);
    },
    receiveVideoData(state, data) {
      const { comments, likes, playCount, videoId } = data;
      state.comments = comments;
      state.likes = likes;
      state.playCount = playCount;
      state.currentVideoId = videoId;
    },
    incrementPlayCount(state) {
      state.playCount = state.playCount + 1;
    },
    logout(state) {
      state.currentUser = null;
      state.likes.liked = false;
      state.likes.disliked = false;
    }
  },
  getters: {
    videos: state => Object.values(state.videos),
    currentUser: state => state.currentUser,
    currentVideo: state => {
      if (state.currentVideoUrl) {
        return state.videos[state.currentVideoUrl];
      } else {
        return null;
      }
    },
    currentVideoUrl: state => state.currentVideoUrl,
    currentVideoId: state => state.currentVideoId,
    likes: state => state.likes,
    comments: state => state.comments
  }
});