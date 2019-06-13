<template>
        <v-ons-page id='home_back'>
            <p align="right">
            <v-ons-button class="show_info_1" v-show="show_info3 === false" icon='fa-angle-down' @click="show_tour_info3()"> ABOUT</v-ons-button>
            <v-ons-button class="show_info_1" v-show="show_info3 === true" icon='fa-angle-up' @click="show_tour_info3()"> ABOUT</v-ons-button>
            </p>
            <div class="home_menu" v-show="show_info3=== true">
                <v-ons-card>
                    APP 소개
                    <p align="right">
                        <v-ons-button class="show_info" v-show="show_info1 === false" icon='fa-angle-down'
                                      @click="show_tour_info()"> 보기
                        </v-ons-button>
                        <v-ons-button class="hide_info" v-show="show_info1 === true" icon='fa-angle-up'
                                      @click="show_tour_info()"> 숨기기
                        </v-ons-button>
                    </p>
                    <div class="home_info" v-show="show_info1=== true">
                        <v-ons-card>
                            <img class="Intro_image" src="../assets/homeImage1.png">
                        </v-ons-card>
                    </div>
                </v-ons-card>
                <v-ons-card>
                    팀 소개
                    <p align="right">
                        <v-ons-button class="show_info" v-show="show_info2 === false" icon='fa-angle-down'
                                      @click="show_tour_info2()"> 보기
                        </v-ons-button>
                        <v-ons-button class="hide_info" v-show="show_info2 === true" icon='fa-angle-up'
                                      @click="show_tour_info2()"> 숨기기
                        </v-ons-button>
                    </p>
                    <div class="home_info" v-show="show_info2=== true">
                        <v-ons-list-header>팀명</v-ons-list-header>
                        <v-ons-card><img class="Intro_image" src="../assets/Team.jpg"></v-ons-card>
                        <v-ons-list-header>팀명</v-ons-list-header>
                        <v-ons-card>팀 : EYE & MAN (10조)</v-ons-card>
                        <v-ons-list-header>팀원 및 학번</v-ons-list-header>
                        <v-ons-card>민태홍 : 201320991 (조장)</v-ons-card>
                        <v-ons-card>김기훈 : 201321003</v-ons-card>
                        <v-ons-card>이현호 : 201421005</v-ons-card>
                        <v-ons-card>백승원 : 201421013</v-ons-card>
                        <v-ons-card>이기용 : 201620938</v-ons-card>
                    </div>
                </v-ons-card>
                <v-ons-card>
                    문의
                    <p align="right">
                        <v-ons-button class="show_info" v-show="show_info4 === false" icon='fa-angle-down'
                                      @click="show_tour_info4()"> 보기
                        </v-ons-button>
                        <v-ons-button class="hide_info" v-show="show_info4 === true" icon='fa-angle-up'
                                      @click="show_tour_info4()"> 숨기기
                        </v-ons-button>
                    </p>
                    <div class="home_info" v-show="show_info4=== true">
                        <v-ons-card>
                            Location : 팔달관 334호
                        </v-ons-card>
                        <v-ons-card>
                            Phone : 010 - 5036 - 0262
                        </v-ons-card>
                        <v-ons-card>
                            Email : swp0514@ajou.ac.kr
                        </v-ons-card>
                    </div>
                </v-ons-card>
            </div>
        </v-ons-page>
</template>

<script>
    export default {
        beforeCreate(){

            this.$http.post('http://13.125.164.72:8000/checkinfo/check/token', {
                params: {
                    id: localStorage.getItem("newEmail"),
                    token: localStorage.getItem("newToken")
                }
            }).then((response) => {
                //로그인 성공;
                console.log(response);
            },(error) => {
                // error 를 보여줌
                console.log(error);
            }).catch(error => {
                alert(error)
            })
        },
        head: {
            script: [
                { src: "http://code.jquery.com/jquery.min.js" },
                { src: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js" },
            ]
        },
        data() {
            return {
                show_info1: false,
                show_info2: false,
                show_info3: false,
                show_info4: false,
            };
        },
        methods: {
            show_tour_info(){
                if(this.show_info1 === false){
                    this.show_info1 = true;
                }
                else{
                    this.show_info1 = false;
                }
            },
            show_tour_info2(){
                if(this.show_info2 === false){
                    this.show_info2 = true;
                }
                else{
                    this.show_info2 = false;
                }
            },
            show_tour_info3(){
                if(this.show_info3=== false){
                    this.show_info3 = true;
                }
                else{
                    this.show_info3 = false;
                }
            },
            show_tour_info4(){
                if(this.show_info4 === false){
                    this.show_info4 = true;
                }
                else{
                    this.show_info4 = false;
                }
            },
            Alarm(id, comment){
                this.$http.post('http://13.125.164.72:8000/checkinfo/alarm', {
                    params: {
                        target: id,
                        comment: comment
                    }
                })
                    .then((response) => {  //로그인 성공;
                            console.log(response);
                        },
                        (error) => { // error 를 보여줌
                            console.log(error);
                        }
                    )
                    .catch(error => {
                        alert(error)
                    })
            }
        }
    };
</script>
<style>
    #home_back .page__background {
          background: url('../assets/homeImage3.png');
      }
    .carousel-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    .color-tag {
        color: #fff;
        font-size: 48px;
        font-weight: bold;
        text-transform: uppercase;
    }
    .dots {
        text-align: center;
        font-size: 20px;
        color: #fff;
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
    }
    .dots > span {
        cursor: pointer;
    }
    .Intro_image {
        width: 100%;
        max-width: 600px;
        height: auto;
    }
    .show_info_1{
        background-color: red;
    }
</style>