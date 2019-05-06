<template>
    <v-ons-page modifier="white">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div id="SignUp">
            <div class="register_title" align="center">
                제목<input v-model="recruit.title" placeholder="제목을 입력하세요.">
            </div>

            <div class="register_location" align="center">
                지역<input v-model="recruit.location" placeholder="지역을 입력하세요.">
            </div>

            <div class="register_location" align="center">
                가격<input v-model="recruit.price" placeholder="지역을 입력하세요.">
            </div>

            <div class="register_content" align="center">
                <br>내용<br>
                <textarea name="content" v-model="recruit.content" cols="100" rows="20" placeholder="내용을 입력하세요.">
                </textarea>
            </div>

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
                    .then((user) => {
                        console.log(user)
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

                recruit: {
                    title: '',
                    location: '',
                    price:'',
                    content: ''
                },

                user: {
                    email: '',
                    password: '',
                    name: '',
                    type: ''
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
    .register_name{
        background: #fff;
        display: block;
        margin: auto;
        padding: 5px 35px 10px 15px;
    }
    .register_id{
        background: #fff;
        display: block;
        margin: auto;
        padding: 5px 35px 10px 15px;
    }
    .register_pw{
        background: #fff;
        display: block;
        margin: auto;
        padding: 5px 35px 10px 15px;
    }
    .register_type{
        background: #fff;
        display: block;
        margin: auto;
        padding: 5px 35px 10px 15px;
    }
</style>
