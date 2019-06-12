<template>
    <v-ons-page modifier="white">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div id="Tae">
            <h1 style="font-size: 25px" align="center">가이드 인증 번호 만들기</h1>
            <input class="register_form" v-model="auth_make" placeholder="가이드 인증 번호 생성">
            <p align="center">
                <button class="check_button" @click="Make_Guide_Auth(auth_make)">만들기!</button>
            </p>
            <h1 style="font-size: 25px" align="center">유저 디비 지우기</h1>
            <input class="register_form" v-model="delete_id" placeholder="유저 디비 지우기">
            <p align="center">
                <button class="check_button" @click="Delete_user_DB(delete_id)">삭제하기!</button>
            </p>
            <h1 style="font-size: 25px" align="center">등록 게시글 지우기</h1>
            <input class="register_form" v-model="db" placeholder="아이디 입력하세요">
            <input class="register_form" v-model="type" placeholder="가이드 or 여행객">
            <p align="center">
                <button class="check_button" @click="Delete_DB(db, type)">삭제하기!</button>
            </p>
            <h1 style="font-size: 25px" align="center">토큰 티비 지우기</h1>
            <input class="register_form" v-model="token_id" placeholder="토큰 디비 지우기 : 아이디">
            <p align="center">
                <button class="check_button" @click="Delete_token_DB(token_id)">삭제하기!</button>
            </p>
        </div>
    </v-ons-page>
</template>

<script>
    export default {
        methods: {
            Delete_token_DB(ID){
                this.$http.post('http://13.125.164.72:8000/checkinfo/delete/token', {
                    params: {id:ID}
                })
                    .then(response => {  //로그인 성공
                            console.log(response.data.data);
                            alert("토큰 디비 삭제 완료");
                        },
                        (error) => { // error 를 보여줌
                            alert(error.response.data.error)
                        }
                    )
                    .catch(error => {
                        alert(error)
                    })
            },
            Make_Guide_Auth(guide_auth) {
                this.$http.post('http://13.125.164.72:8000/checkInfo/guideAuth/make', {
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
            Delete_user_DB(ID){
                this.$http.post('http://13.125.164.72:8000/registUserInfo/delete', {
                    params: {user:ID}
                })
                    .then(response => {  //로그인 성공
                            console.log(response.data.data);
                            alert("사용자 디비 삭제 완료");
                        },
                        (error) => { // error 를 보여줌
                            alert(error.response.data.error)
                        }
                    )
                    .catch(error => {
                        alert(error)
                    })
            },
            Delete_DB(ID,type){
                this.$http.post('http://13.125.164.72:8000/checkInfo/delete2', {
                    params: {
                        user:ID,
                        type:type
                    }
                })
                    .then(response => {  //로그인 성공
                            alert("사용자 디비 삭제 완료");
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
                token_id:'',
                auth_make:'',
                delete_id:'',
                type:'',
                db:''
            };
        }
    };
</script>

<style>
    .register_form{
        background: #fff;
        display: block;
        margin: auto;
        padding: 5px 35px 10px 15px;
    }
</style>
