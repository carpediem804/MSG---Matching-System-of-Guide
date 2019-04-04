<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">HOME</router-link>
      <div id="logout_ing" v-if="forceRerender()">
        <div align="right">
          <router-link to="/login">로그인</router-link> |
          <router-link to="/login/signUp">회원 가입</router-link>
        </div>
      </div>
      <div id="login_ing" v-if="!forceRerender()">
        <div align="right">
          {{ this.$session.get(key = "ses_id") }}님 | {{ this.$session.get(key = "ses_type") }} |
          <button class="logout_button" v-on:click="logout">로그아웃</button>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data () {
      {

      }
      return {
      }
    },
    methods: {
      forceRerender() {
        if (!this.$session.exists()) {
          return true;
        }
        else{
          return false;
        }
      },
      logout: function () {
        alert('success logout')
        this.$session.destroy()
        this.$router.push('/temp')
      }
    }
  }
</script>

<style>
  .logout_button {

    width: 60px;
    height: 60px;

    background-color: #BCA9F5;

    border: none;

    color: #fff;

    padding: 15px 0;

    text-align: center;

    text-decoration: none;

    display: inline-block;

    font-size: 15px;

    margin: 10px;

    cursor: pointer;

    border-radius:10px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
