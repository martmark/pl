<template>
  <div v-if="likes" class="likes-dislikes">
    <div @click.stop="handleClick" id="likes" class="likes">
      <img 
        v-if="likes.liked" 
        src="../assets/svg/thumbs_up_orange.svg" 
        alt="Thumbs Up" />
      <img 
        v-if="!likes.liked" 
        src="../assets/svg/thumbs_up_gray.svg" 
        alt="Thumbs Up" />
      <h3 :class="{ orange: likes.liked }">{{ likes.likeCount }}</h3>
    </div>
    <div class='space-btwn'></div>
    <div @click.stop="handleClick" id="dislikes" class="dislikes">
      <img 
        v-if="likes.disliked" 
        src="../assets/svg/thumbs_down_orange.svg" 
        alt="Thumbs Down" />
      <img 
        v-if="!likes.disliked" 
        src="../assets/svg/thumbs_down_gray.svg" 
        alt="Thumbs Down" />
      <h3 :class="{ orange: likes.disliked }">{{ likes.dislikeCount }}</h3>
    </div>
  </div>
</template>

<script>
import LikesAPI from '../api/likes';

export default {
  name: 'Likes',
  data: function () {
    return {
      likes: null
    }
  },
  created: function () {
    this.setLikes(this.$store.getters.likes);

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'receiveLikes' || mutation.type === 'receiveVideoData') {
        this.setLikes(state.likes);
      }
    });
  },
  methods: {
    setLikes: function (likes) {
      this.likes = likes;
    },
    handleClick: function (e) {
      if (!this.currentUser) {
        this.$notify({
          group: 'foo',
          title: 'You must be logged for that.',
        });
        return;
      }
      if (e.currentTarget.id === 'likes') {
        if (this.likes.liked) {
          this.handleUnlike();
        } else {
          this.handleLike();
        }
      } else {
        if (this.likes.disliked) {
          this.handleUnlike();
        } else {
          this.handleDislike();
        }
      }
    },
    handleLike: async function () {
      const newLikes = {
        liked: true,
        disliked: false,
        likeCount: this.likes.likeCount + 1,
        dislikeCount: this.likes.dislikeCount
      }

      try {

      if (this.likes.disliked) {
        await LikesAPI.switchLike({ 
          userId: this.currentUser.userId, 
          videoId: this.videoId, 
          dislike: false 
        });
        newLikes.dislikeCount--;
      } else {
        await LikesAPI.likeVideo({ 
          userId: this.currentUser.userId, 
          videoId: this.videoId, 
          dislike: false 
        });
      }
      
      this.$store.commit('receiveLikes', newLikes);
      } catch {
        this.$notify({
          group: "foo",
          title: "oops! something went wrong.<br/>please try again."
        })
      }
    },
    handleDislike: async function () {
      const newLikes = {
        liked: false,
        disliked: true,
        likeCount: this.likes.likeCount,
        dislikeCount: this.likes.dislikeCount + 1
      }

      try {
        if (this.likes.liked) {
          await LikesAPI.switchLike({ 
            userId: this.currentUser.userId, 
            videoId: this.videoId, 
            dislike: true 
          });
          newLikes.likeCount--;
        } else {
          await LikesAPI.likeVideo({ 
            userId: this.currentUser.userId, 
            videoId: this.videoId, 
            dislike: true 
          });
        }
        
        this.$store.commit('receiveLikes', newLikes);
      } catch {
        this.$notify({
          group: 'foo',
          title: 'oops! something went wrong.<br/>please try again.'
        })
      }
    },
    handleUnlike: async function () {
      const newLikes = {
        liked: false,
        disliked: false,
        likeCount: this.likes.likeCount,
        dislikeCount: this.likes.dislikeCount
      }

      if (this.likes.liked) {
        newLikes.likeCount--;
      } else {
        newLikes.dislikeCount--;
      }

      try {
        await LikesAPI.unlikeVideo({ 
          userId: this.currentUser.userId, 
          videoId: this.videoId 
        });

        this.$store.commit('receiveLikes', newLikes);
      } catch {
        this.$notify({
          group: 'foo',
          title: 'oops! something went wrong.<br/>please try again.'
        })
      }
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser;
    },
    videoId: function () {
      return this.$store.getters.currentVideoId;
    }
  },
  beforeDestroy() {
    this.unsubscribe();
  },
}
</script>

<style scoped>
div {
  display: flex;
  justify-content: space-between;
  min-width: 12px;
}

#space-btwn {
  width: 10px;
}

img {
  margin-right: 5px;
  height: 1.25em;
}

.likes, .dislikes {
  cursor: pointer;
}

@media all and (min-width: 768px) {
  div {
    min-width: 16px;
  }
}

</style>
