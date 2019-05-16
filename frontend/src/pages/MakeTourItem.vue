<template>
    <v-ons-page modifier="white">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div id="MakeTourItem">
            <v-ons-list>
                <v-ons-list-header>투어 상품 등록</v-ons-list-header>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                            투어 이름
                    </div>
                    <label class="center">
                    <v-ons-input float maxlength="20"
                        placeholder="Tour Title"
                        autofocus="true"
                        v-model="Tour.title"
                    >
                    </v-ons-input>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                            투어 장소
                    </div>
                    <label class="center">
                    <v-ons-input maxlength="20"
                        placeholder="Tour Location"
                        v-model="Tour.location"
                    >
                    </v-ons-input>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                            투어 테마
                    </div>
                    <label class="center">
                    <v-ons-input maxlength="20"
                        placeholder="Tour Thema"
                        v-model="Tour.thema"
                    >
                    </v-ons-input>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                            투어 가격
                    </div>
                    <label class="center">
                    <v-ons-input maxlength="20"
                        placeholder="Tour Price"
                        v-model="Tour.price"
                    >
                    </v-ons-input>
                    원
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                            최대 모집 인원
                    </div>
                    <label class="center">
                    <v-ons-input maxlength="20"
                        placeholder="MaxNumber of People"
                        v-model="Tour.maxNum"
                    >
                    </v-ons-input>
                    명
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                            최소 모집 인원
                    </div>
                    <label class="center">
                    <v-ons-input maxlength="20"
                        placeholder="MinNumber of People"
                        v-model="Tour.minNum"
                    >
                    </v-ons-input>
                    명
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                            투어 시작일
                    </div>
                    <label class="center">
                        <v-ons-input type=datetime-local 
                            v-model="Tour.startDate"
                        >
                        </v-ons-input>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                            투어 종료일
                    </div>
                    <label class="center">
                        <v-ons-input type=datetime-local 
                            v-model="Tour.endDate"
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
                        <textarea name="content" v-model="Tour.content" cols="52" rows="19" placeholder="투어 내용을 입력하세요."></textarea>
                    </div>
                </v-ons-list-item>
                <p align="center">
                    <button class="register_button" @click="makeTour()">작성하기</button>
                </p>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
    import axios from 'axios'
    export default {
        methods: {
            signUp(){
                this.recruit.id = localStorage.getItem('newUser');
                axios.post('http://localhost:8000/recruit/custom',{
                    params: {
                        recruitdata: this.recruit
                    }
                }).then(function(data){
                    console.log("던졋다");
                    this.submitted = true;
                    console.log("submitted가 true 됨 ")
                });
                alert('제출되었습니다.');
                var title=this.recruit.title;
                var location=this.recruit.location;
                console.log(title);
                console.log(location);
                this.$store.commit('navigator/pop');
            },
            makeTour(){
                this.$http.post('http://localhost:8000/registerTour',{
                    params: {
                        TourItem: this.Tour
                    }
                }).then(function(data){
                    console.log("register TourItem complete");
                });
                this.$ons.notification.alert({ 
                    message: "투어 상품이 등록 되었습니다.",
                    title: "투어 상품 등록 성공",
                    callback: function (index) {
                    location.reload();
                    },
                })
                // location.reload();
            },
        },
        data() {
            return {
                Tour: {
                    userId: localStorage.getItem('newEmail'),
                    title: '',
                    location: '',
                    thema: '',
                    price: '',
                    maxNum: '',
                    minNum: '',
                    startDate: '',
                    endDate: '',
                    content: '',  
                },
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








<style scoped>
    .carousel-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .color-tag {
        color: #fff;
        font-size: 48px;
        font-weight: bold;
        text-transform: uppercase;
    }

    .dots {
        text-align: center;
        font-size: 30px;
        color: #fff;
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
    }

    .dots > span {
        cursor: pointer;
    }

    .button_apply{
        display: block;
        top: auto;
        bottom: auto;
        right: auto;
        min-width: 69px;
        height: 43px;
        background: #00c73c;
        border: 1px solid rgba(0,0,0,0.1);
        font-size: 15px;
        line-height: 100%;
        font-weight: bold;
        text-align: center;
        color: #fff;
        z-index: 10;
    }
</style>
