<template>
  <div id="app">
    <Header :currentUser="currentUser" @logout='logout'></Header>
    <Main :currentUser="currentUser" @signed-in='receiveUser'></Main>
    <Footer></Footer>
    <notifications group="foo" classes="orange-notification" />
  </div>
</template>

<script>
import Main from './Main';
import Header from './Header';
import Footer from './Footer';

export default {
  name: 'App',
  components: {
    Main,
    Header,
    Footer
  },
  data: function () {
    return {
      currentUser: null
    }
  },
  created: function () {
    let user = localStorage.getItem('user');
    if (user) {
      this.$store.commit('receiveCurrentUser', JSON.parse(user));
    }
  },
  methods: {
    receiveUser: function (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUser = user;
    },
    logout: function () {
      this.currentUser = null;
      localStorage.removeItem('user');
    }
  }
}
</script>

<style src="@/assets/styles/reset.css"></style>
<style lang="scss" src="@/assets/styles/brand.scss"></style>
<style>
#app {
  width: 100vw;
  position: relative;
  min-height: 100vh;
}
</style>
