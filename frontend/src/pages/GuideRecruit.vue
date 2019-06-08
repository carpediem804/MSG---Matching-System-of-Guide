

<template>

    <v-ons-page>

        <!--<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>-->
        <!--<script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js" ></script>-->


        <custom-toolbar v-bind="toolbarInfo">{{item.RecruitTitle}}</custom-toolbar>
        <v-ons-list-header>{{item.UserID}} 의 글</v-ons-list-header>
        <div class="ddd" style="text-align: center;">
            <v-ons-card>
                지역: {{item.RecruitLocation}}
            </v-ons-card>

            <v-ons-card>
                인원: {{item.RecruitPeopleNumber}}<br>
            </v-ons-card>

            <v-ons-card>
                내용:<br><br>
                {{item.RecruitContent}}<br>
            </v-ons-card>

            <v-ons-card>
                기간:<br>
                {{item.From_time.substring(0,21)}} ~ <br>{{item.To_time.substring(0,21)}}<br>
            </v-ons-card>

            <v-ons-list-header>지원자 : 총 {{item.ApplyGuideID.length}}명</v-ons-list-header>
            <v-ons-list>
                <v-ons-card v-for="todo in item.ApplyGuideID">
                    지원자: {{todo}}
                </v-ons-card>
            </v-ons-list>
        <!--{{item.RecruitNum}}-->
        </div>

        <!--{{session_existed()}}-->

        <div v-if="session_existed() === 2 && item.Apply_state === 0">
            <P align="center">
                <button class="button_apply" @click="push1(page.component,page.label)">가이드 신청하기</button>
            </p>
        </div>
        <div v-if="session_existed() === 0 && item.Apply_state === 0">
            <P align="center">
                <button class="button_apply" @click="go_to_login()">가이드 신청하기</button>
            </p>
        </div>








        <!--<P align="center">-->
        <!--<button class="button_apply" @click="pay()">결제 테스트</button>-->
        <!--</p>-->


    </v-ons-page>





</template>

<script>
    import GuideApply from './ApplyRecruit.vue'
    import Login from './Menu.vue'



export default {
        head: {
            script: [
                { src: "https://code.jquery.com/jquery-1.12.4.min.js" },
                { src: "https://cdn.iamport.kr/js/iamport.payment-1.1.5.js" },
            ]
        },

        data() {
            return {

                item: this.$store.state.item,


                page: {
                    component: GuideApply,
                    label: '가이드 신청글'
                },

                page1: {
                    component: Login,
                    label: '가이드 신청글'
                },

                name: '',
                comment: '',

                Passed_RecruitNum: 11,

                GuideRecruit: {
                    RecruitId: 1,
                    UserId: 1,
                    RecrutTitlevalue: "제주 흑돼지 맛집 잘아시는분!",
                    RecruitLocation: "제주시",
                    // RecruitDayandTime: Date().format("2019-05-08"),
                    RecruitPeopleNumber: 5,
                    RecruitContent: "흑돼지 쌉맛있는 식당 찾습니다 바로가~",
                    ApplyGuideID: "WorldClassGuide_인직"
                },

            };
        },


                methods: {

                    pay(){
                        //
                        // Vue.use(IMP, 'imp11299540');
                        // Vue.IMP().load();

                        console.log()

                        this.$IMP().request_pay({
                            pg: 'kakao',
                            pay_method: 'card',
                            merchant_uid: 'merchant_' + new Date().getTime(),
                            name: '주문명:결제테스트',
                            amount: 100,
                            buyer_email: 'iamport@siot.do',
                            buyer_name: '구매자이름',
                            buyer_tel: '010-1234-5678',
                            buyer_addr: '서울특별시 강남구 삼성동',
                            buyer_postcode: '123-456'
                        }, (result_success) => {
                            //성공할 때 실행 될 콜백 함수
                            var msg = '결제가 완료되었습니다.';
                            msg += '고유ID : ' + result_success.imp_uid;
                            msg += '상점 거래ID : ' + result_success.merchant_uid;
                            msg += '결제 금액 : ' + result_success.paid_amount;
                            msg += '카드 승인번호 : ' + result_success.apply_num;
                            alert(msg);
                        }, (result_failure) => {
                            //실패시 실행 될 콜백 함수
                            var msg = '결제에 실패하였습니다.';
                            msg += '에러내용 : ' + result_failure.error_msg;
                            alert(msg);
                        })
                    },

                    go_to_login(){
                        this._self.$ons.notification.alert({
                            message: "로그인이 필요한 서비스 입니다.",
                            title: "로그인 필요!",
                            callback: function (index) {
                                // location.reload();
                                // this.Toggle(this.page1.component)
                                // this.Pop()
                                // this.Toggle(this.page1.component)
                            },
                        })

                        this.Pop()
                        this.Toggle(this.page1.component)

                    },


                    session_existed() {

                        if (localStorage.getItem('newType') === '여행객') {
                            return 1;
                        }

                        else if (localStorage.getItem('newType') === '가이드'){
                            return 2;
                        }

                        else
                            return 3;
                    },

                    push1(page, key) {
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

                    Pop() {
                        this.$store.commit('navigator/pop', {

                        });
                    },


                    Toggle(page) {
                        this.$store.commit('splitter/toggle', {
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



                },


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
