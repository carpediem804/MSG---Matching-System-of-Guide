<template>
    <v-ons-page modifier="white">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-card>이름 : {{present_user.name}}</v-ons-card>
        <v-ons-card>이메일 : {{present_user.email}}</v-ons-card>
        <v-ons-card>폰번호 : {{present_user.phonenum}}</v-ons-card>
        <v-ons-card>카카오ID : {{present_user.kakaoid}}</v-ons-card>
        <v-ons-card>타입 : {{present_user.type}}</v-ons-card>
    </v-ons-page>
</template>

<script>
    export default {
        methods: {
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
    .register_form{
        background: #fff;
        display: block;
        margin: auto;
        padding: 5px 35px 10px 15px;
    }
</style>
