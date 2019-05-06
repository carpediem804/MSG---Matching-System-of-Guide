<template>
  <v-ons-page modifier="white">
    <div class="login_flag" align="center">
      <div id="login_before" v-if="test2()">
        <h1 style="font-size: 40px; color: #A9BCF5" align="center">MSG</h1>
        <br><br>
        <input class="login_id" v-model="user.email" placeholder="Email" style="height: 20px; margin: 5px">
        <br>
        <input class="login_pw" v-model="user.password" type="Password"  placeholder="password" style="height: 20px; margin: 5px" >
        <v-ons-button class="login_button" @click="Login()">로그인
        </v-ons-button>
        <v-ons-button class="login_button" @click="push(page[0].component, page[0].label)">회원가입
        </v-ons-button>
        <br><br>
      </div>
      <div id="login_after" v-if="!test2()">
        <br>{{ present_user.email }}님 <br>
        <button class="login_button" @click="push(page[1].component, page[1].label)">내 프로필</button>
        <button class="login_button" @click="push(page[2].component, page[2].label)">등록 상품</button>
        <button class="login_button" @click="push(page[3].component, page[3].label)">신청 상품</button>
        <button class="login_button" @click="push(page[4].component, page[4].label)">완료된 상품</button>
        <button class="login_button" @click="Logout()">로그아웃</button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>

  import Menu_test from "./Menu_test.vue";
  import firebase from 'firebase'

  export default {
    methods: {
      test(){
        console.log(localStorage);
      },
      test2(){
        if(localStorage.getItem('newUser')==null){
          return true;
        }
        return false;
      },
      push(page, key) {
        this.$store.commit('navigator/push', {
          extends: page,
          data() {
            return {
              toolbarInfo: {
                backLabel: 'Home',
                title: key
              }
            }
          }
        });
      },
      Login() {
        firebase.auth().signInWithEmailAndPassword(this.user.email,this.user.password).catch(function(err){
          switch(err.code)
          {
            case "auth/invalid-email": {
              alert('유효하지 않은 메일입니다');
              break;
            }
            case "auth/wrong-password":{
              alert('잘못된 패스워드 입니다.');
              break;
            }
          }
        }).then((res)=>{
          let user=res.user
          this.$store.state.user=res.user
          this.$store.state.loggedIn=true
          localStorage.setItem('newUser',this.$store.state.user.email)
          localStorage.setItem('logState',this.$store.state.loggedIn)
          alert("로그인 성공!")
          location.reload();
        })
      },
      Logout(){
        firebase.auth().signOut().catch(function(err){
          alert(err)
        }).then(()=>{
          localStorage.clear()
          alert("로그아웃!")
          location.reload()
        })
      }
    },
    data() {
      return {
        present_user :{
          email: localStorage.getItem('newUser')
        },
        page: [
          {
            component: Menu_test,
            label: '회원가입'
          },
          {
            component: Menu_test,
            label: '테스트1'
          },
          {
            component: Menu_test,
            label: '테스트2'
          },
          {
            component: Menu_test,
            label: '테스트3'
          },
          {
            component: Menu_test,
            label: '테스트4'
          }
        ],
        user: {
          email: '',
          password: ''
        }
      };
    }
  };
</script>
<style>
  .login_button{
    display: block;
    width: 100%;
    height: 50px;
    margin: 20px 0 14px;
    padding-top: 1px;
    border: none;
    border-radius: 0;
    background-color: #A9BCF5;
    cursor: pointer;
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    line-height: 61px;
    -webkit-appearance: none;
  }
  .login_id{
    position: relative;
    width: 100%;
    height: 29px;
    margin: 0 0 14px;
    padding: 10px 35px 10px 15px;
    border: solid 1px #dadada;
    background: #fff;
  }
  .login_pw{
    position: relative;
    width: 100%;
    height: 29px;
    margin: 0 0 14px;
    padding: 10px 35px 10px 15px;
    border: solid 1px #dadada;
    background: #fff;
  }
</style>
