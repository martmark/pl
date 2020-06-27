<template>
  <div class='index'>
    <ul class='index-list'>
      <li class='index-list-item' v-for="video in videos" :key="video.video">
        <img 
          :src="video.thumb" 
          :alt="video.title"
          :class="{ selected: video.video === currentVideoUrl }" 
          @click="setCurrent" :id="video.video" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VideoIndex',
  data: function () {
    return {
      selected: 0
    }
  },
  methods: {
    setCurrent: function (e) {
      this.$store.commit('receiveCurrentVideoUrl', e.target.id);
    }
  },
  computed: {
    videos: function () {
      return this.$store.getters.videos;
    },
    currentVideoUrl: function () {
      return this.$store.getters.currentVideoUrl;
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  cursor: pointer;
}

.index {
  height: 100%;
  width: 85%;
  display: flex;
  justify-content: center;
  margin: auto;
}

.index-list {
  width: 85%;
  margin: auto;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.index-list-item {
  width: 30%;
  box-sizing: border-box;
  display: flex;
}

@media all and (min-width: 768px) {
  .index-list {
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }

  .index-list-item {
    width: 100%;
  }
}
</style>
