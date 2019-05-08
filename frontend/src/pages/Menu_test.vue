<template>
    <v-ons-page modifier="white">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div id="SignUp">
            <h1 style="font-size: 40px; color: #A9BCF5" align="center">MSG</h1>
            <h1 style="font-size: 25px" align="center">이름</h1>
            <input class="register_form" v-model="user.name" placeholder="Name">
            <h1 style="font-size: 25px" align="center">이메일</h1>
            <input class="register_form" v-model="user.email" placeholder="Email">
            <h1 style="font-size: 25px" align="center">비밀번호</h1>
            <input class="register_form" v-model="user.password" type="password"  placeholder="password" align="center">
            <h1 style="font-size: 25px" align="center">전화번호</h1>
            <input class="register_form" v-model="user.phoneNum" placeholder="phone number">
            <h1 style="font-size: 25px" align="center">카카오톡 ID</h1>
            <input class="register_form" v-model="user.kakaoId" placeholder="kakao id">
            <h1 style="font-size: 25px" align="center">타입</h1>
            <select class="register_form" v-model="user.type">
                <option disabled value="">Please select one</option>
                <option>여행객</option>
                <option>가이드</option>
            </select>
            <p align="center">
                <button class="register_button" @click="signUp()">SignUp</button>
            </p>
        </div>
    </v-ons-page>
</template>

<script>

    import firebase from 'firebase';

    export default {
        methods: {
            signUp(){
                firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
                    .then((res) => {
                        this.$http.post('http://localhost:8000/registUserInfo/signup', {
                            user: this.user
                        })
                            .then((response) => {  //로그인 성공
                                },
                                (error) => { // error 를 보여줌
                                    alert(error.response.data.error)
                                }
                            )
                            .catch(error => {
                                alert(error)
                            })
                        alert('제출되었습니다.');
                        this.$store.commit('navigator/pop');
                    })
                    .catch((error) => {
                        console.log(error)
                        alert(error)
                    })
            }
        },
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                    name: '',
                    phoneNum: '',
                    kakaoId: '',
                    type: ''
                },
            };
        }
    };
</script>

<style>
    .register_button{
        width: 150px;
        height: 61px;
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
    .register_form{
        background: #fff;
        display: block;
        margin: auto;
        padding: 5px 35px 10px 15px;
    }
</style>
