<template>
    <v-ons-page modifier="white">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-card>이메일 : {{present_user.email}}</v-ons-card>
        <v-ons-card>타입 : {{present_user.type}}</v-ons-card>
        <v-ons-list-item :modifier="md ? 'nodivider' : ''">
            <div class="left">
                <h3>이름</h3>
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
                <h3>폰번호</h3>
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
                <h3>카카오ID</h3>
            </div>
            <label class="center">
                <v-ons-input maxlength="20"
                             placeholder="예)KAKAO1234"
                             v-model="present_user.kakaoid"
                >
                </v-ons-input>
            </label>
        </v-ons-list-item>
        <p align="center">
            <button class="register_button" @click="fixup()">수정하기</button>
        </p>
    </v-ons-page>
</template>

<script>
    export default {
        methods: {
            fixup(){
                this.$http.post('http://localhost:8000/registUserInfo/fix', {
                    user: this.present_user
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
                present_user :{
                    email: localStorage.getItem('newEmail'),
                    password: localStorage.getItem('newPWD'),
                    name: localStorage.getItem('newName'),
                    phonenum: localStorage.getItem('newPhoneNum'),
                    kakaoid: localStorage.getItem('newkakaoID'),
                    type: localStorage.getItem('newType')
                }
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
