<template>
    <v-ons-page modifier="white">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div id="MakeTourItem">
            <v-ons-list>
                <v-ons-list-header>가이드 모집글</v-ons-list-header>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">

                    <div class="left">
                        제목
                    </div>
                    <label class="center">
                        <v-ons-input float maxlength="20"
                                     placeholder="Tour Title"
                                     autofocus="true"
                                     v-model="recruit.title"
                        >
                        </v-ons-input>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        장소
                    </div>
                    <label class="center">
                        <v-ons-input maxlength="20"
                                     placeholder="Tour Location"
                                     v-model="recruit.location"
                        >
                        </v-ons-input>
                    </label>
                </v-ons-list-item>


                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        단체 인원
                    </div>
                    <label class="center">
                        <v-ons-input maxlength="20"
                                     placeholder="MinNumber of People"
                                     v-model="recruit.number"
                        >
                        </v-ons-input>
                        명
                    </label>
                </v-ons-list-item>


                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        투어 시작
                    </div>
                    <label class="center">
                        <v-ons-input type=datetime-local
                                     v-model="recruit.from_day"
                        >
                        </v-ons-input>

                    </label>
                </v-ons-list-item>

                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        투어 종료
                    </div>
                    <label class="center">
                        <v-ons-input type=datetime-local
                                     v-model="recruit.to_day"
                        >
                        </v-ons-input>
                    </label>
                </v-ons-list-item>


                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        투어 내용
                    </div>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div>
                        <textarea name="content" v-model="recruit.content" cols="50" rows="15" placeholder="투어 내용을 입력하세요."></textarea>
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
                this.$http.post('http://13.125.164.72:8000/recruit/custom222', {
                    params: {
                        id: this.recruit.id,
                        title: this.recruit.title,
                        location: this.recruit.location,
                        number: this.recruit.number,
                        from_day: this.recruit.from_day,
                        to_day: this.recruit.to_day,
                        content: this.recruit.content
                    }
                })
                    .then((response) => {  //로그인 성공;
                        alert('제출되었습니다.');
                        location.reload();
                    },
                    (error) => { // error 를 보여줌
                        alert(error.response.data.error)
                    }
                )
                    .catch(error => {
                        alert(error)
                    })
            },
        },
            data() {
                return {
                    checkGrade: false,
                    recruit: {
                        id: localStorage.getItem('newEmail'),
                        title: '',
                        location: '',
                        number: '',
                        // from_month: '',
                        from_day: '',
                        // to_month: '',
                        to_day: '',
                        content: ''
                    },

                    // from_month: '',
                    from_day: '',
                    // to_month :'',
                    to_day: ''
                };
            }
    }
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