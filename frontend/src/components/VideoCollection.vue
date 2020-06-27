<template>
  <div v-if='fetched' class="collection">
    <h2>{{ currentVideo.title }}</h2>
    <div class="video-player">
      <VideoPlayer></VideoPlayer>
    </div>
    <div class='video-details'>
      <h3>{{ playCount }} Views</h3>
      <Likes></Likes>
    </div>
    <div class='collection-index'>
      <VideoIndex></VideoIndex>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import VideoAPI from '../api/videos';
import Likes from './Likes';
import VideoIndex from './VideoIndex';
import VideoPlayer from './VideoPlayer';

export default {
  name: 'VideoCollection',
  data: function () {
    return {
      currentVideo: null,
      fetched: false
    }
  },
  components: {
    Likes,
    VideoIndex,
    VideoPlayer
  },
  created: async function () {
    // this.getVideoData();
    this.fetched = true;
    this.currentVideo = this.$store.getters.currentVideo;

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'receiveCurrentVideoUrl') {
        if (state.currentVideoUrl) {
          this.currentVideo = this.$store.getters.currentVideo;
          this.getVideoData();
        }
      } else if (mutation.type === 'receiveCurrentUser') {
        this.getVideoData();
      }
    });
  },
  methods: {
    // getVideoData: async function () {
    //   let id = null;

    //   if (this.currentUser) {
    //     id = this.currentUser.userId;
    //   }
    //   let { data } = await VideoAPI.getVideoData(this.currentVideoUrl, id);
    //   this.$store.commit('receiveVideoData', data);
    // }
  },
  computed: mapState(['currentVideoUrl', 'playCount', 'currentUser']),
  beforeDestroy() {
    this.unsubscribe();
  },
  
}
</script>

<style scoped>
video {
  max-width: 100%;
}

h2 {
  margin: auto 0;
}

.collection {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1.5fr 4fr 1.5fr 1fr;
  padding-bottom: 25px;
}

.video-player {
  grid-row: 2;
  grid-column: 1;
  display: flex;
}

.video-details {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  grid-row: 3;
  grid-column: 1;
  align-items: center;
}

.collection-index {
  grid-row: 4;
  grid-column: 1;
}

@media all and (min-width: 768px) {
  .collection {
    grid-template-rows: .75fr 4fr .75fr;
    grid-template-columns: 3fr 1fr;
  }

  .collection-index {
    grid-row: 2;
    grid-column: 2;
    margin-left: 15px;
  }

  .video-player {
    width: 100%;
  }
}
</style>