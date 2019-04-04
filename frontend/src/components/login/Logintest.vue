<template>
    <div id="login_test">
        <h1 style="font-size: 40px; color: #A9BCF5">테스트 페이지</h1>
        <br><br>
        <!--<button class="test_button" v-on:click="logout">로그아웃</button>-->
        <br><br>
        <!--<a v-bind:href="url.signUpUrl" > 회원가입 하러 가기 </a>-->
    </div>
</template>

<script>
    export default {
        name: 'test',
        data () {
            return { }
        },
        beforeCreate: function () {
            if (!this.$session.exists()) {
                this.$router.push('/')
            }
        },
        methods: {
            logout: function () {
                alert('success logout')
                this.$session.destroy()
                this.$router.push('/')
            }
        }
    }
</script>
<!--<style>-->
<!--.login_button{-->
<!--display: block;-->
<!--width: 100%;-->
<!--height: 61px;-->
<!--margin: 20px 0 14px;-->
<!--padding-top: 1px;-->
<!--border: none;-->
<!--border-radius: 0;-->
<!--background-color: #A9BCF5;-->
<!--cursor: pointer;-->
<!--text-align: center;-->
<!--color: #fff;-->
<!--font-size: 20px;-->
<!--font-weight: 700;-->
<!--line-height: 61px;-->
<!-- -webkit-appearance: none;-->
<!--}-->
<!--.login_id{-->
<!--position: relative;-->
<!--width: 100%;-->
<!--height: 29px;-->
<!--margin: 0 0 14px;-->
<!--padding: 10px 35px 10px 15px;-->
<!--border: solid 1px #dadada;-->
<!--background: #fff;-->
<!--}-->
<!--.login_pw{-->
<!--position: relative;-->
<!--width: 100%;-->
<!--height: 29px;-->
<!--margin: 0 0 14px;-->
<!--padding: 10px 35px 10px 15px;-->
<!--border: solid 1px #dadada;-->
<!--background: #fff;-->
<!--}-->
<!--</style>-->