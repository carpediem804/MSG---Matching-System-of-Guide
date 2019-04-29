<template>
    <div id="SignUp">
        <h1 style="font-size: 40px; color: #A9BCF5">MSG</h1>
        <h3>이름</h3>
        <input class="register_name" v-model="user.name" placeholder="name">
        <h3>아이디</h3>
        <input class="register_id" v-model="user.id" placeholder="ID">
        <h3>패스워드</h3>
        <input class="register_pw" v-model="user.password" type="password"  placeholder="password"><br>
        <h3>타입</h3>
        <select class="register_type" v-model="user.type">
            <option disabled value="">Please select one</option>
            <option>여행객</option>
            <option>가이드</option>
        </select>
        <p align="center">
            <button class="register_button" v-on:click="signUp">SignUp</button>
        </p>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                user: {
                    id: '',
                    password: '',
                    name: '',
                    type: ''
                }
            }
        },
        methods:
            {
                signUp: function (event) {
                    this.$http.post('http://localhost:8000/login/signUp', { //axios 사용
                        user: this.user
                    })
                        .then((response) => {
                            if (response.data.result === 0) {
                                alert('Error, please, try again')
                            }
                            if (response.data.result === 1) {
                                alert('Success')
                                this.$router.push('/login/test') // Login 페이지로 보내줌
                            }
                        })
                        .catch(function (error) {
                            alert('error')
                        })
                }
            }
    }
</script>
<style>
    .register_button{
        display: block;
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
    .register_name{
        position: relative;
        width: 200px;
        height: 35px;
        margin: 0 0 14px;
        padding: 5px 35px 10px 15px;
        border: solid 1px #dadada;
        background: #fff;
    }
    .register_id{
        position: relative;
        width: 200px;
        height: 35px;
        margin: 0 0 14px;
        padding: 5px 35px 10px 15px;
        border: solid 1px #dadada;
        background: #fff;
    }
    .register_pw{
        position: relative;
        width: 200px;
        height: 35px;
        margin: 0 0 14px;
        padding: 5px 35px 10px 15px;
        border: solid 1px #dadada;
        background: #fff;
    }
    .register_type{
        position: relative;
        width: 200px;
        height: 35px;
        margin: 0 0 14px;
        padding: 5px 35px 10px 15px;
        border: solid 1px #dadada;
        background: #fff;
    }
    h3{
        margin-right: 100px;
        display: block;
        font-size: 1.17em;
        font-weight: bold;
    }
</style>