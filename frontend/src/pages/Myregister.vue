<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-list-item>
            <v-ons-card v-for="todo in traveler_register_data">
                <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" style="width: 100%">
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
        </v-ons-list-item>
        <v-ons-list-item>
            <v-ons-card v-for="todo in guide_register_data">
                <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" style="width: 100%">
                <div class="title2">
                    {{todo.TourTitle}}
                </div>
                <v-ons-button class ="tourinfo"  :key="todo" @click="push(page2.component, page2.label)"> 투어상품</v-ons-button>
                <div class="test2" align="right">{{todo.TourNowPeopleNum}}명 / {{todo.TourMaxNum}}명</div>
                <div class="content2">
                    <v-ons-list>
                        <v-ons-list-item ># {{todo.TourLocation}} # {{todo.TourThema}} </v-ons-list-item>
                        <v-ons-list-item># {{todo.TourContent}}</v-ons-list-item>
                        <v-ons-list-item># {{todo.TourPrice}}$  </v-ons-list-item>
                    </v-ons-list>
                </div>
            </v-ons-card>
        </v-ons-list-item>
    </v-ons-page>
</template>

<script>
    export default {

        beforeCreate(){
            this.$http.post('http://localhost:8000/checkInfo/register', {
                user: this.user
            })
                .then((response) => {  //로그인 성공;
                    console.log(this.user.type);
                    // if(this.user.type === '여행객'){
                        //     this.traveler_register_data=response.data.recruitdata;
                        // }
                        // else{
                        //     this.guide_register_data=response.data.recruitdata;
                        // }
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
                user: {
                    email: localStorage.getItem('newEmail'),
                    type: localStorage.getItem('newType')
                },
                traveler_register_data:{
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
                },
                guide_register_data:{
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
                }
            };
        },
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
            }
        },
    };
</script>
<style>
</style>
