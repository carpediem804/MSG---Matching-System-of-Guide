<template>
  <v-ons-page modifier="white">
    <div class="login_flag" align="center">
      
      <!-- 로그인 전 화면 -->
      <div id="login_before" v-if="test2()">
        <h1 style="font-size: 40px; color: white" align="center"><ons-icon style="font-size: 40px; color: white" icon="fa-plane-departure"></ons-icon>MSG</h1>
        
        <v-ons-list>
          <v-ons-list-header>로그인</v-ons-list-header>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''">
            <div class="left">
              <v-ons-icon fixed-width class="list-item__icon" icon="fa-user-circle"></v-ons-icon>
            </div>
            <label class="center">
              <v-ons-input float maxlength="20" placeholder="Email" v-model="user.email"></v-ons-input>
            </label>
          </v-ons-list-item>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''">
            <div class="left">
              <v-ons-icon fixed-width class="list-item__icon" icon="fa-key"></v-ons-icon>
            </div>
            <label class="center">
              <v-ons-input float maxlength="20" placeholder="password" v-model="user.password" type="Password"></v-ons-input>
            </label>
          </v-ons-list-item>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''">
            <div class="right">
              <v-ons-button style="background-color: #A9BCF5" @click="Login()">로그인</v-ons-button>
            </div>
          </v-ons-list-item>
          <v-ons-list-header>회원가입</v-ons-list-header>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''"
            @click="push(page[0].component, page[0].label)"
          >
            <div class="left">
              <v-ons-icon fixed-width class="list-item__icon" icon="fa-user-plus"></v-ons-icon>
            </div>
            <div class="center">
              회원가입
            </div>
          </v-ons-list-item>
          <v-ons-list-header>관리자</v-ons-list-header>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''"
            @click="admin()"
          >
            <div class="left">
              <v-ons-icon fixed-width class="list-item__icon" icon="fa-lock"></v-ons-icon>
            </div>
            <div class="center">
              관리자 페이지
            </div>
          </v-ons-list-item>
          <v-ons-list-header>Links</v-ons-list-header>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''"
            @click="loadLink('https://github.com/carpediem804/MSG---Matching-System-of-Guide')"
          >
            <div class="left">
              <v-ons-icon fixed-width class="list-item__icon" icon="ion-social-github"></v-ons-icon>
            </div>
            <div class="center">
              MSG Github
            </div>
            <div class="right">
              <v-ons-icon icon="fa-external-link"></v-ons-icon>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
      
      <!-- 로그인 후 화면 -->
      <div id="login_after" v-if="!test2()">
        <h1 style="font-size: 40px; color: white" align="center"><ons-icon style="font-size: 40px; color: white" icon="fa-plane-departure"></ons-icon>MSG</h1>

        <v-ons-list>
          <v-ons-list-header>로그인 정보</v-ons-list-header>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''">
            <div class="left">
              <v-ons-icon fixed-width class="list-item__icon" icon="fa-user"></v-ons-icon>
            </div>
            <div class="center">
              {{ present_user.name }}
            </div>
          </v-ons-list-item>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''">
            <div class="left">
              <v-ons-icon fixed-width class="list-item__icon" icon="fa-address-card"></v-ons-icon>
            </div>
            <div class="center">
              {{ present_user.type }}
            </div>
          </v-ons-list-item>
          <v-ons-list-item v-if="session_existed()" :modifier="md ? 'nodivider' : ''"
            @click="push(page[6].component, page[6].label)"
          >
            <div class="left">
              <v-ons-icon fixed-width class="list-item__icon" icon="fa-star"></v-ons-icon>
            </div>
            <div class="center">
              <ons-icon v-for="n in Math.floor(UserGrade)" icon="fa-star" style="color: gold"></ons-icon>
              <ons-icon v-if="count(UserGrade)" icon="fa-star-half-alt" style="color: gold"></ons-icon>
              {{UserGrade}} 점 
            </div>
          </v-ons-list-item>
        </v-ons-list>
        
        <v-ons-list>
          <v-ons-list-header>활동</v-ons-list-header>
          <v-ons-list-item v-for="(item, index) in afterMenu" :key="item.title"
            :modifier="md ? 'nodivider' : ''"
            @click="push(page[index+1].component, page[index+1].label)"
          >
            <div class="left">
              <v-ons-icon fixed-width class="list-item__icon" :icon="item.icon"></v-ons-icon>
            </div>
            <div class="center">
              {{ item.title }}
            </div>
          </v-ons-list-item>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''"
            @click="Logout()"
          >
            <div class="left">
              <v-ons-icon fixed-width class="list-item__icon" icon="fa-sign-out-alt"></v-ons-icon>
            </div>
            <div class="center">
              로그아웃
            </div>
          </v-ons-list-item>
        </v-ons-list>
        
        <v-ons-list>
          <v-ons-list-header>Links</v-ons-list-header>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''"
            @click="loadLink('https://github.com/carpediem804/MSG---Matching-System-of-Guide')"
          >
            <div class="left">
              <v-ons-icon fixed-width class="list-item__icon" icon="ion-social-github"></v-ons-icon>
            </div>
            <div class="center">
              MSG Github
            </div>
            <div class="right">
              <v-ons-icon icon="fa-external-link"></v-ons-icon>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
  import Menu_test from "./SignUp.vue"
  import Myregister from "./Myregister.vue"
  import Mypage from "./Mypage.vue"
  import firebase from 'firebase'
  import Admin from "./TaeTae.vue";
  import Myapply from "./Myapply.vue";
  import ShowReview2 from "./showguidreview2.vue";

  export default {
    mounted() {
      $('.login_flag').parent().attr('style', 'background-color: #99ccff !important')      
    },
    methods: {
      loadLink(url) {
        window.open(url, '_blank');
        console.log($('.login_flag').parent())
      },
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
      admin(){
        this.$ons.notification.prompt({
          message: '비밀번호를 입력하세요',
          title: '관리자 페이지',
          buttonLabels: 'access',
          placeholder: '',
          inputType: 'password',
          cancelable: 'true',
          _self: this,
          callback: function (password) {
            if(password == '123123'){
              this._self.push(this._self.page[5].component, this._self.page[5].label)
            }
            else {
              this._self.$ons.notification.alert({
                  message: "check password",
                  title: "ERROR",
              })
            }
          }
        })
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
        afterMenu: [
          {
            title: '프로필 수정',
            icon: 'fa-user-edit'
          },
          {
            title: '등록 상품',
            icon: 'fa-clipboard-list'
          },
          {
            title: '신청 상품',
            icon: 'fa-clipboard-list'
          },
        ],
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
            component: Admin,
            label: '관리자 페이지'
          },
          {
            component: ShowReview2,
            label: '리뷰'
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
