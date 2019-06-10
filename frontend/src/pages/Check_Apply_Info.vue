<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-list-header>{{user}} 의 글 </v-ons-list-header>
        <div class="traveler" v-if="session_type()">
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
                        <v-ons-card @click="push(page2.component,page2.label,item.Email)">평점 :
                            <ons-icon v-for="n in Math.floor(item.GuideGrade)"  style="color: gold" icon="fa-star"></ons-icon>
                            <ons-icon v-if="count(item.GuideGrade)"  style="color: gold" icon="fa-star-half-alt"></ons-icon>
                            {{item.GuideGrade}} / {{item.Total_Review}}명 평가</v-ons-card>
                        <v-ons-card>여행 진행 건수 : {{item.Total_Tour}}</v-ons-card>
                    </v-ons-card>
                </div>
                <p align="right">
                    <v-ons-button class="show_info" v-show="show_info === false" icon='fa-angle-down'
                                  @click="show_guide_info(user)"> 보기
                    </v-ons-button>
                    <v-ons-button class="hide_info" v-show="show_info === true" icon='fa-angle-up'
                                  @click="show_guide_info(user)"> 숨기기
                    </v-ons-button>
                </p>
            </v-ons-card>
            <v-ons-card v-for="todo in guide_apply_data">
                투어 정보
                <img v-bind:src="'http://localhost:8000/'+todo.apply_Image_URL" alt="MSG" width="275" height="230">
                <v-ons-card>가격 : {{todo.SuggestPrice}}</v-ons-card>
                <v-ons-card>내용 : {{todo.SuggestContent}}</v-ons-card>
            </v-ons-card>
            <div class="confirm" v-if="!confirm()">
                <p align="center">
                    <v-ons-button class="ConfirmGuide" icon='fa-check'
                                  @click="Confirm_Guide(guide_apply_data[0].SuggestPrice)"> 가이드 확정 및 결제하기
                    </v-ons-button>
                </p>
            </div>
        </div>
        <!--<div class="traveler" v-if="!session_type()">-->
        <!--아직 미구현입니다.-->
        <!--</div>-->
    </v-ons-page>
</template>

<script>
    import showguidreview from "./showguidreview.vue";

    export default {
        head: {
            script: [
                { src: "https://code.jquery.com/jquery-1.12.4.min.js" },
                { src: "https://cdn.iamport.kr/js/iamport.payment-1.1.5.js" },
            ]
        },
        beforeCreate(){
            this.$http.post('http://localhost:8000/checkInfo/show', {
                params: {
                    type: localStorage.getItem('newType'),
                    user: this.$store.state.user,
                    target: this.$store.state.target
                }
            })
                .then((response) => {  //로그인 성공;
                        if(localStorage.getItem('newType') === '여행객'){
                            this.guide_apply_data=response.data.data;
                            console.log(this.guide_apply_data);
                        }
                        else{
                            this.traveler_apply_data=response.data.Tourdata;
                        }
                    },
                    (error) => { // error 를 보여줌
                        alert(error.response.data.error)
                    }
                )
                .catch(error => {
                    alert(error)
                })
        },
        methods:{
            push(page, key,guidid) {
                console.log("push한 guid id"+guidid);
                this.$store.state.guidid = guidid;
                this.$store.commit('navigator/push', {
                    extends: page,
                    data() {
                        return {
                            toolbarInfo: {
                                backLabel: 'Back',
                                title: key
                            }
                        }
                    }
                });
            },
            Alarm(id, title, comment){
                this.$http.post('http://localhost:8000/checkinfo/alarm', {
                    params: {
                        target: id,
                        comment: comment,
                        title: title
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
            },
            count(counter){
                var temp = counter;
                temp = temp - Math.floor(counter);
                if(temp>0)
                {this.checkGrade= true;}
                else
                    this.checkGrade =false;
                return this.checkGrade;
            },
            confirm(){
                if(this.guide_apply_data[0].apply_status === 1){
                    return true;
                }
                else{
                    return false;
                }
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
            session_type(){
                if(localStorage.getItem('newType') === '여행객'){
                    return true;
                }
                else{
                    return false;
                }
            },
            Confirm_Guide(key){
                this.$IMP().request_pay({
                    pg: 'kakao',
                    pay_method: 'card',
                    merchant_uid: 'merchant_' + new Date().getTime(),
                    name: '주문명:결제테스트',
                    amount: key,
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
                    this.$http.post('http://localhost:8000/confirm/', {
                        params: {
                            user: this.user,
                            target: this.target
                        }
                    })
                        .then((response) => {  //로그인 성공;
                                console.log(response.data);
                                console.log("확인확인");
                                console.log(response.data.RecruitApplier);
                                this.$http.post('http://localhost:8000/checkInfo/guide/addtour', {
                                    params: {
                                        user_id: response.data.RecruitApplier,
                                    }
                                })
                                    .then((res) => {
                                            return 0;
                                        },
                                        (err) => {
                                            alert(err.response.data.error)
                                            return 0;
                                        })
                                    .catch(err => {
                                        alert(err);
                                        return 0;
                                    });
                                alert("가이드가 확정되었습니다.");
                                // this.Alarm(this.user, "가이드 지원글 가이드 확정.","지원한 게시글의 가이드로 확정되었습니다.");
                                location.reload();
                                // location.reload();
                            },
                            (error) => { // error 를 보여줌
                                alert(error.response.data.error)
                            }
                        )
                        .catch(error => {
                            alert(error)
                        })
                }, (result_failure) => {
                    //실패시 실행 될 콜백 함수
                    var msg = '결제에 실패하였습니다.';
                    msg += '에러내용 : ' + result_failure.error_msg;
                    alert(msg);
                })
            }
        },
        data() {
            return {
                page2: {
                    component: showguidreview,
                    label: '가이드리뷰보기'
                },
                user: this.$store.state.user,
                target: this.$store.state.target,
                traveler_apply_data:[{
                }],
                guide_apply_data:[],
                guide_info:[],
                show_info: false
            };
        }
    }
</script>

<style scoped>
</style>