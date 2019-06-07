<template>
  <v-ons-page modifier="white">
    <!-- <div class="profile-pic">
      <img src="../assets/logo1.png"> -->
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
        <v-ons-button class="login_button" @click="push(page[5].component, page[5].label)">관리자용
        </v-ons-button>
        <br><br>
      </div>
      <div id="login_after" v-if="!test2()">
        <br>
        {{ present_user.name }}님 / {{ present_user.type }}<br>
       <div v-if="session_existed()">
        <ons-icon v-for="n in Math.floor(UserGrade)" icon="fa-star" style="color: gold"></ons-icon>
        <ons-icon v-if="count(UserGrade)" icon="fa-star-half-alt"style="color: gold"></ons-icon>
           {{UserGrade}} 점<br>
       </div>

        <button class="login_button" @click="push(page[1].component, page[1].label)">프로필 수정</button>
        <button class="login_button" @click="push(page[2].component, page[2].label)">등록 상품</button>
        <button class="login_button" @click="push(page[3].component, page[3].label)">신청 상품</button>
        <button class="login_button" @click="push(page[4].component, page[4].label)">확정 상품</button>
        <!--<button class="login_button" @click="push(page[5].component, page[5].label)">홍스홍스</button>-->
        <button class="login_button" @click="Logout()">로그아웃</button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>

  import Menu_test from "./SignUp.vue"
  import Myregister from "./Myregister.vue"
  import Mypage from "./Mypage.vue"
  import firebase from 'firebase'
  import TaeTae from "./TaeTae.vue";
  import Myapply from "./Myapply.vue";

  export default {
    methods: {
      count(counter){
        var temp = counter;
        temp = temp - Math.floor(counter);
        if(temp>0)
        {this.checkGrade= true;}
        else
          this.checkGrade =false;

        return this.checkGrade;
      },
      session_existed() {
        if (localStorage.getItem('newType') === '가이드') {
          return true;
        }
        return false;
      },
      test2(){
        if(localStorage.getItem('newEmail')==null){
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
                backLabel: 'back',
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
          this.$http.post('http://localhost:8000/registUserInfo/login', {
            email: this.user.email
          })
                  .then((response) => {  //로그인 성공;
                            localStorage.setItem('newImagePath', response.data.user_info.User_ImageURL);
                            localStorage.setItem('newEmail', response.data.user_info.Email)
                            localStorage.setItem('newPWD',response.data.user_info.PWD)
                            localStorage.setItem('newName', response.data.user_info.Name)
                            localStorage.setItem('newPhoneNum', response.data.user_info.PhoneNum)
                            localStorage.setItem('newkakaoID', response.data.user_info.kakaoID)
                            localStorage.setItem('newType', response.data.user_info.Type)
                            localStorage.setItem('newGuide_Grade', response.data.user_info.GuideGrade);
                            localStorage.setItem('newGuide_Total_Tour', response.data.user_info.Total_Tour);
                            localStorage.setItem('newGuide_Total_Review', response.data.user_info.Total_Review);
                            alert("로그인 성공!")
                            location.reload();
                          },
                          (error) => { // error 를 보여줌
                            alert(error.response.data.error)
                          }
                  )
                  .catch(error => {
                    alert(error)
                  })
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
        checkGrade: false,
        UserGrade: localStorage.getItem('newGuide_Grade'),
        counter: this.UserGrade,
        present_user :{
          email: localStorage.getItem('newEmail'),
          password: localStorage.getItem('newPWD'),
          name: localStorage.getItem('newName'),
          phonenum: localStorage.getItem('newPhoneNum'),
          kakaoid: localStorage.getItem('newkakaoID'),
          type: localStorage.getItem('newType')
        },
        page: [
          {
            component: Menu_test,
            label: '회원가입'
          },
          {
            component: Mypage,
            label: '프로필 수정'
          },
          {
            component: Myregister,
            label: '등록 상품'
          },
          {
            component: Myapply,
            label: '신청 상품'
          },
          {
            component: Menu_test,
            label: '확정 상품'
          },
          {
            component: TaeTae,
            label: '퉤퉤'
          },
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
