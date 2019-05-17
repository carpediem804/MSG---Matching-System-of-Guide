<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div class="traveler" v-if="session_type()">
            <v-ons-list-header>가이드 모집글 : 총 {{traveler_register_data.length}}건</v-ons-list-header>
            <v-ons-list>
                <v-ons-card v-for="todo in traveler_register_data" @click="push(page.component, page.label, todo)">
                    <img src="../assets/background4.jpg" alt="Image File" style="width:310px; height:auto">
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
        <div class="guide" v-if="!session_type()">
            <v-ons-list-header>투어 등록상품 : 총 {{guide_register_data.length}}건</v-ons-list-header>
            <v-ons-list>
                <v-ons-card v-for="todo in guide_register_data" @click="push(page.component, page.label, todo)">
                    <img src="../assets/background2.jpg" alt="Image File" style="width:310px; height:auto">
                    <div class="title2">
                        {{todo.TourTitle}}
                    </div>
                    <div class="test2" align="right">{{todo.TourNowPeopleNum}}명 / {{todo.TourMaxNum}}명</div>
                    <div class="content2">
                        <v-ons-list>
                            <v-ons-list-item ># {{todo.TourLocation}} # {{todo.TourThema}} </v-ons-list-item>
                            <v-ons-list-item># {{todo.TourContent}}</v-ons-list-item>
                            <v-ons-list-item># {{todo.TourPrice}}$  </v-ons-list-item>
                        </v-ons-list>
                    </div>
                </v-ons-card>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
    import Test from "./Register_Info.vue";

    export default {
        beforeCreate(){
            this.$http.post('http://localhost:8000/checkInfo/register', {
                params: {
                    email: localStorage.getItem('newEmail'),
                    type: localStorage.getItem('newType')
                }
            })
                .then((response) => {  //로그인 성공;
                        if(localStorage.getItem('newType') === '여행객'){
                            this.traveler_register_data=response.data.applyguidedata;
                        }
                        else{
                            this.guide_register_data=response.data.Tourdata;
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
                    component: Test,
                    label: '세부 정보'
                },
                traveler_register_data:[{
                    ApplyRecruitID: "",
                    From_time: "",
                    RecruitContent: "",
                    RecruitLocation: "",
                    RecruitNum: 0,
                    RecruitPeopleNumber: 3,
                    RecruitTitle: "",
                    To_time: "",
                    UserID: "",
                    WriteTime: ""
                }],
                guide_register_data:[{
                    TourContent: "",
                    TourDayandTime: "",
                    TourImageURL: "",
                    TourLocation: "",
                    TourThema: '',
                    TourMaxNum: 10,
                    TourMinNum: 5,
                    TourNowPeopleNum: 0,
                    TourNum: 0,
                    TourPrice: 150000,
                    TourTitle: "",
                    Tour_create_date: "",
                    UserID: ""
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
                // console.log(this.$store.state.item);
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
</style>
