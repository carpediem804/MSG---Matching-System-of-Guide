<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div class="traveler" v-if="session_type()">
            <v-ons-list-header>신청글 : 총 {{travler_apply_data.length}}건</v-ons-list-header>
            <v-ons-list>
                <v-ons-card v-for="todo in travler_apply_data" @click="push(page.component, page.label, todo)" >
                    <img v-bind:src="'http://localhost:8000/'+todo.TourImageURL" alt="MSG" width="275" height="230">
                    <v-ons-button ><v-ons-icon icon="ion-thumbsup"></v-ons-icon></v-ons-button>
                    <v-ons-button ><v-ons-icon icon="ion-share"></v-ons-icon></v-ons-button>
                    <div class="title2">
                        <strong>  {{todo.TourTitle}} </strong>
                    </div>
                    <div class="test2" align="right">{{todo.TourNowPeopleNum}}명 / {{todo.TourMaxNum}}명</div>
                    <div class="content2">

                        <v-ons-list>
                            <v-ons-list-item ># {{todo.TourPrice}}\  </v-ons-list-item>
                            <v-ons-list-item ># {{todo.TourLocation}} # {{todo.TourThema}} </v-ons-list-item>
                            <v-ons-list-item class="conte" ># {{todo.TourContent}}</v-ons-list-item>
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
            this.$http.post('http://localhost:8000/checkInfo/apply', {
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

<style scoped>

</style>