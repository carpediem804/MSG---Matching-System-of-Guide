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
                <div class="guide_info" v-if="user.type === '가이드'">
                    <br>
                    <h1 style="font-size: 25px" align="center">가이드 인증 번호 만들기</h1>
                    <input class="register_form" v-model="auth_make" placeholder="Make Guide registration number">
                    <p align="center">
                        <button class="check_button" @click="Make_Guide_Auth(auth_make)">만들기!</button>
                    </p>
                    <h1 style="font-size: 25px" align="center">가이드 인증 번호</h1>
                    <input class="register_form" v-model="user.auth" placeholder="Guide registration number">
                    <p align="center">
                        <button class="check_button" @click="Check_Guide(user.auth)">인증 번호 확인</button>
                    </p>
                    <h1 style="font-size: 25px" align="center">프로필 사진 등록</h1>
                    <v-ons-list :modifier="md ? 'nodivider' : ''">
                        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 text-center app">

                            <img class="profile-image" :src="userImage" width="100%" height="230px"/>

                            <div v-if="!userImage">
                                <input type="file" round class="change-profile-image" @change="onFileChange" />
                            </div>
                            <div v-else>
                                <button class="delete-profile-image" color="secondary" icon="delete" @click="removeImage">Delete</button>
                            </div>

                        </div>
                    </v-ons-list>
                </div>
            <p align="center">
                <button class="register_button" @click="signUp()">SignUp</button>
            </p>
        </div>
    </v-ons-page>
</template>

<script>
    import axios from 'axios';
    import firebase from 'firebase';

    export default {
        methods: {
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files
                this.selectedFile = e.target.files[0];
                if (!files.length) {
                    return
                }
                this.createImage(files[0])
                console.log('이미지올림');
                console.log(files[0].name);
                console.log(this.selectedFile.name);


            },

            createImage(file) {
                var reader = new FileReader()
                var vm = this

                reader.onload = (e) => {
                    vm.userImage = e.target.result

                }
                reader.readAsDataURL(file)

            },
            removeImage: function (e) {
                this.userImage = ''
            },
            Make_Guide_Auth(guide_auth) {
                this.$http.post('http://localhost:8000/checkInfo/guideAuth/make', {
                    params: {Auth_Number: guide_auth}
                })
                    .then(response => {  //로그인 성공
                            console.log(response.data.data);
                            alert("등록번호 생성 완료!");
                        },
                        (error) => { // error 를 보여줌
                            alert(error.response.data.error)
                        }
                    )
                    .catch(error => {
                        alert(error)
                    })
            },
            Check_Guide(guide_auth) {
                this.$http.post('http://localhost:8000/checkInfo/guideAuth/check', {
                    params: {Auth_Number: guide_auth}
                })
                    .then(response => {  //로그인 성공
                            console.log(response.data.data);
                            if (response.data.data.length === 0) {
                                alert("인증하지 못했습니다. 번호를 확인하세요.");
                                this.guide_auth = 0;
                            } else {
                                alert("인증완료!");
                                this.guide_auth = 1;
                            }
                        },
                        (error) => { // error 를 보여줌
                            alert(error.response.data.error)
                        }
                    )
                    .catch(error => {
                        alert(error)
                    })
            },
            signUp() {
                if (this.user.type === '가이드' && this.guide_auth === 0) {
                    alert('가이드 인증을 하지 않았습니다. 가이드 인증을 해주세요.');
                } else {
                    firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
                        .then((res) => {
                            axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
                            let formData = new FormData();
                            formData.append('file', this.selectedFile);
                            axios.post('http://localhost:8000/registUserInfo/signup', formData, {
                                params: {
                                    Email: this.user.email,
                                    PWD: this.user.password,
                                    Name: this.user.name,
                                    PhoneNum: this.user.phoneNum,
                                    kakaoID: this.user.kakaoId,
                                    Type: this.user.type,
                                    Auth: this.user.auth
                                }
                            }).then(function (data) {
                                console.log("register UserInfo complete");
                            });
                            this.$ons.notification.alert({
                                message: "사용자 정보가 등록 되었습니다.",
                                title: "회원 가입 성공",
                                callback: function (index) {
                                    location.reload();
                                },
                            })
                        })
                }
            },
        },
            data() {
                return {
                    user: {
                        email: '',
                        password: '',
                        name: '',
                        phoneNum: '',
                        kakaoId: '',
                        auth: '',
                        type: ''
                    },
                    auth_make: '',
                    userImage: '',
                    selectedFile: null,
                    guide_auth: 0,
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
