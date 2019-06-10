<template>
    <v-ons-page modifier="white">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div class="check_guide" v-show="present_user.type === '가이드'">
            <v-ons-card>
                <img  v-if="!userImage" v-bind:src="'http://13.125.164.72:8000/'+UserImage" alt="MSG" width="275" height="230">
                <img v-else class="profile-image" :src="userImage" width="275" height="230"/>
                <div v-if="!userImage">
                    <input type="file" round class="change-profile-image" @change="onFileChange" />
                </div>
                <div v-else>
                    <button class="delete-profile-image" color="secondary" icon="delete" @click="removeImage">Delete</button>
                </div>
            </v-ons-card>
            <v-ons-card>평점 {{present_user.grade}} / {{present_user.total_review}} 건</v-ons-card>
            <v-ons-card>총 여행 완료 상품 수 : {{present_user.total_tour}}</v-ons-card>
        </div>
        <v-ons-card>이메일 : {{present_user.email}}</v-ons-card>
        <v-ons-card>타입 : {{present_user.type}}</v-ons-card>
        <v-ons-list>
        <v-ons-list-item :modifier="md ? 'nodivider' : ''">
            <div class="left">
                <h3>수정할 이름 </h3>
            </div>
            <label class="center">
                <v-ons-input maxlength="20"
                             placeholder="예)홍길동"
                             v-model="present_user.name"
                >
                </v-ons-input>
            </label>
        </v-ons-list-item>
        <v-ons-list-item :modifier="md ? 'nodivider' : ''">
            <div class="left">
                <h3>수정할 폰번호 </h3>
            </div>
            <label class="center">
                <v-ons-input maxlength="20"
                             placeholder="예)01012345678"
                             v-model="present_user.phonenum"
                >
                </v-ons-input>
            </label>
        </v-ons-list-item>
        <v-ons-list-item :modifier="md ? 'nodivider' : ''">
            <div class="left">
                <h3>수정할 카카오ID </h3>
            </div>
            <label class="center">
                <v-ons-input maxlength="20"
                             placeholder="예)KAKAO1234"
                             v-model="present_user.kakaoid"
                >
                </v-ons-input>
            </label>
        </v-ons-list-item>
        </v-ons-list>
        <p align="center">
            <button class="register_button" @click="fixup()">수정하기</button>
        </p>
    </v-ons-page>
</template>

<script>
    import axios from 'axios'
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
            fixup(){
                axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
                let formData = new FormData();
                formData.append('file',this.selectedFile);

                axios.post('http://13.125.164.72:8000/registUserInfo/fix',formData, {
                    params: {
                        useremail: this.present_user.email,
                        userpassword: this.present_user.password,
                        username: this.present_user.name,
                        userphonenum: this.present_user.phonenum,
                        userkakaoid: this.present_user.kakaoid,
                        usertype: this.present_user.type,
                        usergrade: this.present_user.grade,
                        usertotal_tour: this.present_user.total_tour,
                        usertotal_review: this.present_user.total_review,
                    }
                })
                    .then(response => {  //로그인 성공
                            localStorage.clear();
                            alert('정보 수정 완료! 다시 로그인 해주세요.');
                            location.reload();

                        },
                        (error) => { // error 를 보여줌
                            alert(error.response.data.error)
                        }
                    )
                    .catch(error => {
                        alert(error)
                    })
            }
        },
        data() {
            return {
                userImage: '',
                present_user :{
                    email: localStorage.getItem('newEmail'),
                    password: localStorage.getItem('newPWD'),
                    name: localStorage.getItem('newName'),
                    phonenum: localStorage.getItem('newPhoneNum'),
                    kakaoid: localStorage.getItem('newkakaoID'),
                    type: localStorage.getItem('newType'),
                    grade: localStorage.getItem('newGuide_Grade'),
                    total_tour : localStorage.getItem('newGuide_Total_Tour'),
                    total_review : localStorage.getItem('newGuide_Total_Review')
                },
                UserImage: localStorage.getItem('newImagePath')
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
</style>
