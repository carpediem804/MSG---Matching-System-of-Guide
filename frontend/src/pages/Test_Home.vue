<template>
    <v-ons-page modifier="white">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div id="MakeTourItem">
            <v-ons-list>
                <v-ons-list-header>가이드 신청</v-ons-list-header>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        투어 가격
                    </div>
                    <label class="center">
                        <v-ons-input maxlength="20"
                                     placeholder="Tour Price"
                                     v-model="recruit.price">
                        </v-ons-input>
                        원
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        투어 내용
                    </div>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div>
                        <textarea name="content" v-model="recruit.content" cols="52" rows="19" placeholder="투어 내용을 입력하세요."></textarea>
                    </div>
                </v-ons-list-item>
                <p align="center">
                    <button class="register_button" @click="signUp()">작성하기</button>
                </p>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
    import axios from 'axios'

    export default {
            methods: {
            signUp() {
                axios.post('http://localhost:8000/recruit/apply', {
                params: {applydata: this.recruit}
                }).then(function (data) {
                    alert('제출되었습니다.');
                    location.reload();
                });
            }
        },
        data() {
            return {
                recruit: {
                    target : this.$store.state.item.RecruitNum,
                    id : localStorage.getItem('newEmail'),
                    price:'',
                    content: '',
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
