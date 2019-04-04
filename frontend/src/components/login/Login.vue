<template>
    <div id="login">
        <h1 style="font-size: 40px; color: #A9BCF5">MSG</h1>
        <br><br>
        <input class="login_id" v-model="user.id" placeholder="ID">
        <br>
        <input class="login_pw" v-model="user.password" type="password"  placeholder="password" >
        <button class="login_button" v-on:click="login">로그인</button>
        <br><br>
        <!--<a v-bind:href="url.signUpUrl" > 회원가입 하러 가기 </a>-->
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                user: {
                    id: '',
                    password: ''
                },
                url: {
                    signUpUrl: '/login/signUp'
                }
            }
        },
        methods: {
            login: function () {
                this.$http.post('http://localhost:8000/login/checkLogin', {
                    user: this.user
                })
                    .then(
                        (response) => {  //로그인 성공
                            alert('success login')
                            this.$session.start()
                            // console.log(response.data.id)
                            this.$session.set('ses_id', response.data.id)
                            this.$session.set('ses_type', response.data.type)
                            this.$router.push('/') // home 페이지로 보내줌.
                        },
                        (error) => { // error 를 보여줌
                            alert(error.response.data.error)
                        }
                    )
                    .catch(error => {
                        alert(error)
                    })
            }
        }
    }
</script>
<style>
    .login_button{
        display: block;
        width: 100%;
        height: 61px;
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
        height: 40px;
        margin: 0 0 14px;
        padding: 10px 35px 10px 15px;
        border: solid 1px #dadada;
        background: #fff;
    }
    .login_pw{
        position: relative;
        width: 100%;
        height: 40px;
        margin: 0 0 14px;
        padding: 10px 35px 10px 15px;
        border: solid 1px #dadada;
        background: #fff;
    }
</style>