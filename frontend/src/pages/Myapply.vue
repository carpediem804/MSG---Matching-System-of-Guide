<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div class="traveler" v-if="session_type()">
            <v-ons-list-header>신청글 : 총 {{travler_apply_data.length}}건</v-ons-list-header>
            <v-ons-list>
                <v-ons-card v-for="todo in travler_apply_data" @click="push(page.component, page.label, todo)" >
                    <img v-bind:src="'http://13.125.164.72:8000/'+todo.TourImageURL" alt="MSG" width="275" height="230">
                    <div class="title2">
                        <strong>  {{todo.TourTitle}} </strong>
                    </div>
                    <div class="test2" align="right">{{todo.TourNowPeopleNum}}명 / {{todo.TourMaxNum}}명</div>
                    <div class="content2">

                        <v-ons-list>
                            <v-ons-list-item ># {{todo.TourLocation}} # {{todo.TourThema}} </v-ons-list-item>
                            <v-ons-list-item ># {{todo.TourPrice}}\  </v-ons-list-item>
                            <v-ons-list-item># {{time_set(todo.TourDayandTime_start.toString().substring(0,19))}} ~ <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{time_set(todo.TourDayandTime_end.toString().substring(0,19))}}</v-ons-list-item>
                            <v-ons-list-item class="conte" ># {{todo.TourContent}}</v-ons-list-item>
                            <v-ons-list-item>
                                <div class="content4" v-if="todo.TourState === 0">여행객 모집 중</div>
                                <div class="content3" v-if="todo.TourState === 1">여행객 모집 완료</div>
                                <div class="content5" v-if="todo.TourState === 2">기간 지남</div>
                            </v-ons-list-item>
                        </v-ons-list>
                    </div>
                </v-ons-card>
            </v-ons-list>
        </div>
        <div class="guide" v-if="!session_type()">
            <v-ons-list-header>신청글 : 총 {{guide_apply_data.length}}건</v-ons-list-header>
            <v-ons-list>
                <v-ons-card v-for="todo in guide_apply_data" @click="push(page.component, page.label, todo)">
                    <div class="title2">
                        {{todo.RecruitTitle}}
                    </div>
                    <div class="test2" align="right">{{todo.RecruitPeopleNumber}}명</div>
                    <div class="content2">
                        <v-ons-list>
                            <v-ons-list-item ># {{todo.RecruitLocation}} </v-ons-list-item>
                            <v-ons-list-item># {{time_set(todo.From_time.toString().substring(0,19))}} ~ <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{time_set(todo.To_time.toString().substring(0,19))}}</v-ons-list-item>
                            <v-ons-list-item >
                                <div class="content4" v-if="todo.Apply_state === 0">가이드 미정</div>
                                <div class="content3" v-if="todo.Apply_state === 1">가이드 확정</div>
                                <div class="content5" v-if="todo.Apply_state === 2">기간 지남</div>
                            </v-ons-list-item>
                        </v-ons-list>
                    </div>
                </v-ons-card>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
    import Apply_Info from "./Apply_Info.vue";

    export default {
        beforeCreate(){
            this.$http.post('http://13.125.164.72:8000/checkInfo/apply', {
                params: {
                    email: localStorage.getItem('newEmail'),
                    type: localStorage.getItem('newType')
                }
            })
                .then((response) => {  //로그인 성공;
                        if(localStorage.getItem('newType') === '여행객'){
                            this.travler_apply_data=response.data.data;
                        }
                        else{
                            this.guide_apply_data=response.data.data;
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
        data() {
            return {
                page: {
                    component: Apply_Info,
                    label: '세부 정보'
                },
                travler_apply_data:[{
                    TourApplyList:[],
                    TourContent:"",
                    TourDayandTime_start:"",
                    TourDayandTime_end:"",
                    TourImageURL:"",
                    TourLocation:"",
                    TourMaxNum:"",
                    TourMinNum:"",
                    TourNowPeopleNum:"",
                    TourPrice:"",
                    TourThema:"",
                    TourTitle:"",
                    Tour_create_date:"",
                    UserID:"",
                }],
                guide_apply_data:[{
                    ApplyGuideID: "",
                    From_time: "",
                    RecruitContent:"",
                    RecruitLocation: "",
                    RecruitNum: "",
                    RecruitPeopleNumber: "",
                    RecruitTitle: "",
                    To_time: "",
                    UserID: "",
                    WriteTime: "",
                }]
            };
        },
        methods: {
            time_set(key){
                var time_set = this.$moment(key).format('YYYY-MM-DD h:mm a');
                return time_set;
            },
            session_type(){
                if(localStorage.getItem('newType') === '여행객'){
                    return true;
                }
                else{
                    return false;
                }
            },
            push(page, key, todo) {
                this.$store.state.item = todo;
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
            }
        },
    };
</script>

<style>
    .content3{
        display: block;
        width: 100%;
        height: 50px;
        margin: 20px 0 14px;
        padding-top: 1px;
        border: none;
        border-radius: 0;
        background-color: #F79F81;
        cursor: pointer;
        text-align: center;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        line-height: 61px;
        -webkit-appearance: none;
    }
    .content4{
        display: block;
        width: 100%;
        height: 50px;
        margin: 20px 0 14px;
        padding-top: 1px;
        border: none;
        border-radius: 0;
        background-color: #01DF01;
        cursor: pointer;
        text-align: center;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        line-height: 61px;
        -webkit-appearance: none;
    }
    .content5{
        display: block;
        width: 100%;
        height: 50px;
        margin: 20px 0 14px;
        padding-top: 1px;
        border: none;
        border-radius: 0;
        background-color: red;
        cursor: pointer;
        text-align: center;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        line-height: 61px;
        -webkit-appearance: none;
    }
</style>