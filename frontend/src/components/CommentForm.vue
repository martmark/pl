<template>
  <div class="comment-form">
    <h3>Comments</h3>
    <form @submit.prevent="addComment">
      <div class='comment-input'>
        <textarea 
          type="text" 
          v-model="body" 
          placeholder="Type up a sweet comment..."
          :disabled="!currentUser">
        </textarea>
      </div>
      <button v-if="currentUser" type='submit'>
        <span class="button-span">
          Add Comment
        </span>
      </button>
    </form>
    <SignIn @signed-in='alertSignIn' v-if="!currentUser"></SignIn>
  </div>
</template>

<script>
import CommentApi from '../api/comments';
import SignIn from './SignIn';

export default {
  name: 'CommentForm',
  data: function () {
    return {
      body: '',
    }
  },
  components: {
    SignIn
  },
  methods: {
    addComment: async function (e) {
      if (e.target.id === 'sign-in-btn') return;
      if (this.body.length < 1) {
        this.$notify({
          group: 'foo',
          title: 'comment cannot be empty.'
        });
        return;
      }
      try {
        const { data } = await CommentApi.addComment({
          body: this.body,
          videoId: this.videoId,
          userId: this.currentUser.userId
        });
        
        this.body = '';
        this.$store.commit('receiveComment', data);
      } catch {
        this.$notify({
          group: 'foo',
          title: 'oops! something went wrong.<br/>please try again.'
        });
      }
    },
    alertSignIn: function (user) {
      this.$emit('signed-in', user);
    }
  },
  computed: {
    videoId: function () {
      return this.$store.getters.currentVideoId;
    },
    currentUser: function () {
      return this.$store.getters.currentUser;
    }
  }
}
</script>

<style scoped>
.comment-form {
  display: flex;
  flex-direction: column;
}

h3 {
  padding: 25px 0;
}

textarea {
  height: 150px;
}

@media all and (min-width: 768px) {
  textarea {
    height: 75px;
  }
}
</style>
