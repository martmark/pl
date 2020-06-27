<template>
  <div id="header">
    <div class='greeting blue'>
      <div class='greeting-inner'>
        <div v-if="currentUser" class='name-logout'>
          <span class='welcome'>Welcome,</span>&nbsp;
          <span class='name'>{{ currentUser.fName }}</span>
          <div @click='logout' class='logout-div'>
          </div>
        </div>
        <div v-if="!currentUser">
        </div>
        <div class='martin'>
          <span>Martin Markaj</span>
        </div>
      </div>
    </div>
    <div class='dark'>
      <div class='header-logo'>
        <img src="../assets/png/blank.png" alt="Love" />
        <span><h1>VIDEO PLAYER</h1></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout: function () {
      this.$store.commit('logout');
      localStorage.removeItem('user');
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser;
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
}

.greeting {
  height: 90px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.greeting-inner {
  width: 85%;
  margin: auto;
  font-size: 20px;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.name-logout {
  display: flex;
  align-items: center;
}

.logout-div {
  background-image: url('../assets/svg/logout_icon.svg');
  color: white;
  height: 12px;
  width: 17px;
  margin-left: 10px;
  cursor: pointer;
}

.header-logo {
  height: 220px;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}

img {
  height: 60px;
  padding-bottom: 20px;
}

.welcome {
  padding-right: 4px;
}

.martin {
  font-size: 12px;
}

@media all and (min-width: 768px) {
  .greeting {
    height: 50px;
  }

  .greeting-inner {
    font-size: 18px;
  }

  .header-logo {
    flex-direction: row;
    justify-content: flex-start;
    width: 85%;
    max-width: 1200px;
    margin: auto;
    align-items: center;
    height: 125px;
  }

  img {
    margin: 0;
    padding-right: 25px;
    padding-bottom: 0;
  }

  h1 {
    font-size: 25px;
  }

  .martin {
    font-size: 18px;
  }
}
</style>
