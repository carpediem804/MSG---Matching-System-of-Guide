
<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo">{{tour.TourTitle}}</custom-toolbar>

        <div class="ddd" style="text-align: center;">
            <img v-bind:src="'http://localhost:8000/'+tour.TourImageURL" alt="MSG" width="275" height="230">
            <v-ons-card>
                지역: {{tour.TourLocation}}<br>
            </v-ons-card>

            <v-ons-card>
                테마: {{tour.TourThema}}<br>
            </v-ons-card>

            <v-ons-card>
                날짜: <br>
                {{tour.TourDayandTime_start.substring(0,21)}} ~ <br>
                {{tour.TourDayandTime_end.substring(0,21)}}<br>
            </v-ons-card>

            <v-ons-card>
                신청 인원: {{tour.TourNowPeopleNum}}/{{tour.TourMaxNum}}<br>
                최소 인원: {{tour.TourMinNum}}<br>
            </v-ons-card>

            <v-ons-card>
                가격: {{tour.TourPrice}}원<br>
            </v-ons-card>

            <v-ons-card>
                내용:<br><br>
                {{tour.TourContent}}<br>
            </v-ons-card>
            <v-ons-card>
                가이드 프로필
                <div class="guide_info" v-show="show_info === true">
                    <v-ons-card v-for="item in guide_info">
                        <img v-bind:src="'http://localhost:8000/'+item.User_ImageURL" alt="MSG" width="275" height="230">
                        <v-ons-card>이메일 : {{item.Email}}</v-ons-card>
                        <v-ons-card>이름 : {{item.Name}}</v-ons-card>
                        <v-ons-card>핸드폰 번호 : {{item.PhoneNum}}</v-ons-card>
                        <v-ons-card>카카오 ID : {{item.kakaoID}}</v-ons-card>
                        <v-ons-card>가이드 등록번호 : {{item.Auth}}</v-ons-card>
                        <v-ons-card>평점 :
                            <ons-icon v-for="n in Math.floor(item.GuideGrade)" icon="fa-star"></ons-icon>
                            <ons-icon v-if="count(item.GuideGrade)" icon="fa-star-half-alt"></ons-icon>
                            {{item.GuideGrade}} / {{item.Total_Review}}명 평가</v-ons-card>
                        <v-ons-card>여행 진행 건수 : {{item.Total_Tour}}</v-ons-card>
                    </v-ons-card>
                </div>
                <p align="right">
                    <v-ons-button class="show_info" v-show="show_info === false" icon='fa-angle-down'
                                  @click="show_guide_info(tour.UserID)"> 보기
                    </v-ons-button>
                    <v-ons-button class="hide_info" v-show="show_info === true" icon='fa-angle-up'
                                  @click="show_guide_info(tour.UserID)"> 숨기기
                    </v-ons-button>
                </p>
            </v-ons-card>
        </div>
        <div v-if="session_existed()!==2 && tour.TourState === 0">
            <P align="center">
                <button class="button_notapply" disabled="true" v-if="tour.TourNowPeopleNum>= tour.TourMaxNum" @click="applyTour()">투어상품 신청하기</button>
                <button class="button_apply" v-else @click="applyTour()">투어상품 신청하기</button>
            </p>
        </div>

    </v-ons-page>



</template>

<script>
    import login from './Menu.vue'
    export default {
        methods: {
            count(counter){
                var temp = counter;
                temp = temp - Math.floor(counter);
                if(temp>0)
                {this.checkGrade= true;}
                else
                    this.checkGrade =false;
                return this.checkGrade;
            },
            show_guide_info(key1){
                if(this.show_info === false){
                    this.show_info=true;
                    this.$http.post('http://localhost:8000/checkInfo/guide', {
                        params: {user: key1}
                    })
                        .then((response) => {  //로그인 성공;
                                this.guide_info = response.data.data;
                                console.log(this.guide_info);
                            },
                            (error) => { // error 를 보여줌
                                alert(error.response.data.error)
                            }
                        )
                        .catch(error => {
                            alert(error)
                        })
                }
                else{
                    this.show_info = false;
                }
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
            Toggle(page) {
                this.$store.commit('splitter/toggle', {
                    extends: page,
                    // this.$store.navigator.mutations.pop(page);
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
            pay(num){
                this.$IMP().request_pay({
                    pg: 'kakao',
                    pay_method: 'card',
                    merchant_uid: 'merchant_' + new Date().getTime(),
                    name: this.tour.TourTitle,
                    amount: parseInt(num) * parseInt(this.tour.TourPrice),
                    buyer_email: localStorage.getItem('newEmail'),
                    buyer_name: '구매자이름',
                    buyer_tel: '010-1234-5678',
                    buyer_addr: '서울특별시 강남구 삼성동',
                    buyer_postcode: '123-456',
                }, (result_success) => {
                    //성공할 때 실행 될 콜백 함수
                    this.$http.post('http://localhost:8000/applyTour',{
                        params: {
                            Number: num,
                            userInfo: this.tour,
                            TourInfo: localStorage.getItem('newEmail'),
                        }
                    })
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
            applyTour(){
                if (localStorage.getItem('newType') === null){
                    this._self.$ons.notification.alert({
                        message: "로그인이 필요한 서비스 입니다.",
                        title: "로그인 필요!",
                        callback: function (index) {
                            // location.reload();
                        },
                    });
                    this.Pop();
                    this.Toggle(this.page.component);
                }
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
                                    this._self.pay(num);
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
                checkGrade: false,
                tour: this.$store.state.tour,
                show_info: false,
                guide_info: [],
                page: {
                    component: login,
                    label: '로그인'
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
    .button_notapply{
        opacity: 0.3;
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