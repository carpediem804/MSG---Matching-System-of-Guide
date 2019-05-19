<template>
<v-ons-page>
    <custom-toolbar v-bind="toolbarInfo">{{tour.TourTitle}}</custom-toolbar>

    <div class="ddd" style="text-align: center;">
        <img v-bind:src="'http://localhost:8000/'+tour.TourImageURL" alt="MSG" width="275" height="230">
        <v-ons-card>
            지역: {{tour.TourLocation}}<br>
            날짜: {{tour.TourDayandTime}}<br>
            테마: {{tour.TourThema}}<br>
        </v-ons-card>

        <v-ons-card>
            신청 인원: {{tour.TourNowPeopleNum}}/{{tour.TourMaxNum}}<br>
            최소 인원: {{tour.TourMinNum}}<br>
        </v-ons-card>
        <v-ons-card>
            가격: {{tour.TourPrice}}<br>
        </v-ons-card>

        <v-ons-card>
            내용:<br><br>
            {{tour.TourContent}}<br>
        </v-ons-card>

        <v-ons-card>
            가이드:<br><br>
            {{tour.UserID}}<br>

        </v-ons-card>


    </div>

    <P align="center">
        <button class="button_apply" @click="applyTour()">투어상품 신청하기</button>
    </p>

</v-ons-page>



</template>

<script>
    import GuideApply from './ApplyRecruit.vue'

    export default {
        methods: {
            push(page, key) {
                this.$store.commit('navigator/push', {
                    extends: page,
                    data() {
                        return {
                            toolbarInfo: {
                                backLabel: 'Home',
                                title: key
                            }
                        }
                    }
                });
            },

            applyTour(){
                if (localStorage.getItem('newType') === null){
                this._self.$ons.notification.alert({
                    message: "로그인이 필요한 서비스 입니다.",
                    title: "로그인 필요!",
                    callback: function (index) {
                        // location.reload();
                    },
                });}
                else {
                    this.$ons.notification.prompt({
                        message: '신청 인원',
                        title: '투어 신청',
                        buttonLabels: '신청하기',
                        placeholder: '숫자만 입력해주세요',
                        inputType: 'tel',
                        cancelable: 'true',
                        _self: this,
                        callback: function (num) {
                            if(num>0){
                                if((parseInt(this._self.tour.TourNowPeopleNum) + parseInt(num)) > parseInt(this._self.tour.TourMaxNum)){
                                    this._self.$ons.notification.alert({ 
                                        message: "투어 최대 인원을 초과하였습니다.",
                                        title: "신청 실패",
                                    })
                                }
                                else{
                                    this._self.$http.post('http://localhost:8000/applyTour',{
                                    params: {
                                        Number: num,
                                        userInfo: this._self.tour,
                                        TourInfo: localStorage.getItem('newEmail'),
                                    }
                                    })
                                    this._self.$ons.notification.alert({ 
                                        message: "신청이 정상적으로 완료 되었습니다.",
                                        title: "신청 완료",
                                    }).then(res => {
                                        location.reload();                                       
                                    })
                                }
                            }
                            else if(num==0){
                                this._self.$ons.notification.alert({ 
                                        message: "1명 이상만 신청 가능합니다.",
                                        title: "신청 실패",
                                })
                            }
                            else if(num==null){
                                this._self.$ons.notification.alert({ 
                                        message: "취소되었습니다.",
                                        title: "신청 취소",
                                })
                            }
                            else{
                                this._self.$ons.notification.alert({ 
                                        message: "다시 시도해주세요.",
                                        title: "신청 실패",
                                })
                            }
                        }
                    })
                }
            },
        },
        data() {
            return {
                tour: this.$store.state.tour,

                page: {
                    component: GuideApply,
                    label: '투어상품'
                },


            };
        }
    };
</script>









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
