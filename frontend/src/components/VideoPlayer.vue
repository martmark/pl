<template>
  <div 
    @click.stop='togglePlay' 
    @mouseenter="showButton" 
    @mouseleave="hideButton" 
    class="player">
      <div class='player-window'>
        <video
          @pause="markPause"
          @playing="markPlay"
          id="vdplyr"
          :key="currentVideo.video"
          :poster="currentVideo.thumb">
          
          <source
            :src="currentVideo.video"
            type="video/mp4">
        </video>
        <div id='player-buttons' class='hidden'>
          <img class='play-pause' 
            @click.stop="play" 
            v-if="!playing" 
            src="../assets/svg/play.svg" 
            alt="Play" />
          <img 
            class='play-pause' 
            @click.stop="pause" 
            v-if="playing" 
            src="../assets/svg/pause.svg" 
            alt="Play" />
        </div>
      </div>
  </div>
</template>

<script>
import VideoAPI from '../api/videos';

export default {
  name: 'VideoPlayer',
  data: function () {
    return {
      playing: false,
      played: false
    }
  },
  props: {
    video: Object,
    videoId: Number
  },
  methods: {
    play: async function () {
      if (!this.played) {
        this.played = true;
        await VideoAPI.logPlay(this.currentVideoId)
        this.$store.commit('incrementPlayCount');
      }
      this.playing = true;
      document.getElementById('vdplyr').play();
    },
    pause: function () {
      this.playing = false;
      document.getElementById('vdplyr').pause();
    },
    togglePlay: function () {
      if (!this.playing) {
        this.play();
      } else {
        this.pause();
      }
    },
    markPause: function () {
      this.playing = false;
    },
    markPlay: function () {
      this.playing = true;
    },
    showButton: function () {
      document.getElementById('player-buttons').classList.remove('hidden');
    },
    hideButton: function () {
      document.getElementById('player-buttons').classList.add('hidden');
    }
  },
  computed: {
    currentVideo: function () {
      return this.$store.getters.currentVideo;
    },
    currentVideoId: function () {
      return this.$store.getters.currentVideoId;
    }
  },
  watch: {
    currentVideo: function (val, oldVal) {
      if (val.video !== oldVal.video) {
        document.getElementById('vdplyr').pause();
        this.playing = false;
        this.played = false;
      }
    }
  }
}
</script>

<style scoped>
video {
  max-width: 100%;
}

.player {
  position: relative;
}

.player-window {
  width: 100%;
  height: 100%;
}

@media all and (max-width: 767px) {
  #player-buttons {
    display: none;
  }
}

@media all and (min-width: 768px) {
  .player-video {
    width: 100%;
  }

  .play-pause {
    position: absolute;
    left: 30px;
    bottom: 30px;
    height: 75px;
  }
  
  .play-pause {
    position: absolute;
    left: 30px;
    bottom: 30px;
    height: 50px;
  }
}
</style>