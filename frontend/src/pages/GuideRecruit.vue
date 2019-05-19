<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo">{{item.RecruitTitle}}</custom-toolbar>

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
            <v-ons-list-header>지원자 : 총 {{item.ApplyGuideID.length}}명</v-ons-list-header>
            <v-ons-list>
                <v-ons-card v-for="todo in item.ApplyGuideID">
                    지원자: {{todo}}
                </v-ons-card>
            </v-ons-list>
        <!--{{item.RecruitNum}}-->
        </div>

        <!--{{session_existed()}}-->

        <div v-if="session_existed()===2">
            <P align="center">
                <button class="button_apply" @click="push1(page.component,page.label)">가이드 신청하기</button>
            </p>
        </div>

        <div v-else-if="session_existed()===1">

        </div>

        <div v-else>
            <P align="center">
                <button class="button_apply" @click="go_to_login()">가이드 신청하기</button>
            </p>
        </div>

        <!--<div v-else>-->
            <!--<P align="center">-->
                <!--<button class="button_apply" @click="Replace(page1.component)">가이드 신청하기</button>-->
            <!--</p>-->
        <!--</div>-->

        <!--<div v-else>-->
            <!--<P align="center">-->
                <!--<button class="button_apply" @click="Toggle(page1.component)">가이드 신청하기</button>-->
            <!--</p>-->
        <!--</div>-->

        <!--{{this.$store.mutations.replace(this.$store.state, this.$store.replace())}}-->




    </v-ons-page>





</template>

<script>
    import GuideApply from './ApplyRecruit.vue'
    import Login from './Menu.vue'


    export default {

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
                    go_to_login(){
                        this._self.$ons.notification.alert({
                            message: "로그인이 필요한 서비스 입니다.",
                            title: "로그인 필요!",
                            callback: function (index) {
                                // location.reload();
                                // this.Toggle(this.page1.component)
                            },
                        })


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

                    Replace(page) {
                        this.$store.commit('navigator/replace', {
                            extends: page,
                            // data() {
                            //     return {
                            //         toolbarInfo: {
                            //             backLabel: 'Home',
                            //             // title: key
                            //         }
                            //     }
                            // }
                        });
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
