<template>
  
    <h1>hello martin</h1>
  
</template>

<script>
import VideoAPI from '../api/videos';

export default {
  name: 'Main',
  // components: {
  //   VideoCollection,
  //   CommentIndex,
  //   CommentForm
  // },
  data: function () {
    return {
      fetched: false
    }
  },
  created: async function () {
    const { data: { videos }} = await VideoAPI.fetchVideos();
    // debugger;
    // const vidsObj = {};
    // let currentUrl;
    // data.forEach((video, i) => {
    //   let url = video.video;
    //   let selected = false;
    //   if (i === 0) {
    //     selected = true;
    //     currentUrl = url;
    //   }
    //   vidsObj[url] = Object.assign({}, video, { selected });
     
    // });
    console.log('klerk', videos);
    // this.$store.commit('receiveVideos', videos);
    // this.$store.commit('receiveCurrentVideoUrl', currentUrl);
    // this.fetched = true;
  },
  computed: {
    currentVideoUrl: function () {
      return this.$store.getters.currentVideoUrl;
    }
  }
}
</script>

<style scoped>
#main {
  width: 85%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 0 auto;
  margin-top: 30px;
}


@media all and (min-width: 768px) {
  .video-div {
    display: flex;
    justify-content: space-between;
  }

  .comment-div {
    width: 75%;
  }
}
</style>
