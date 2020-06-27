<template>
  <div class='sign-in'>
    <button @click="signIn" class="sign-in-btn"></button>
  </div>
</template>

<script>
import AuthAPI from '../api/auth';
export default {
  name: 'SignIn',
  methods: {
    signIn: async function () {
      try {
      window.google.signIn()
      .then( async res => {
        let user = await AuthAPI.signIn(res);
        this.$store.commit('receiveCurrentUser', user.data);
        localStorage.setItem('user', JSON.stringify(user.data));
      });
      } catch {
        this.$notify({
          group: 'foo',
          title: 'oops! something went wrong.<br/>please try again.'
        });
      }
    }
  },

}
</script>

<style scoped>
.sign-in-btn {
  width: 252px;
  height: 46px;
  background-image: url('../assets/svg/sign_in_with_google_btn.svg');
}

.sign-in-btn:hover {
  background-image: url('../assets/svg/sign_in_with_google_btn_HOVER.svg');
}
</style>