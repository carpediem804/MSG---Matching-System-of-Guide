<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo">{{GuideRecruit.RecrutTitlevalue}}</custom-toolbar>

        <div class="ddd" style="text-align: center;">
            <v-ons-card>
                지역: {{GuideRecruit.RecruitLocation}}
            </v-ons-card>

            <v-ons-card>
                인원: {{GuideRecruit.RecruitPeopleNumber}}<br>
            </v-ons-card>

            <v-ons-card>
                내용:<br><br>
                {{GuideRecruit.RecruitContent}}<br>
            </v-ons-card>

            <v-ons-card>
                지원자:<br><br>
                {{GuideRecruit.ApplyGuideList}}<br>

            </v-ons-card>


        </div>

        <P align="center">
            <button class="button_apply" @click="push(page.component, page.label)">가이드 신청하기</button>
        </p>

    </v-ons-page>



</template>

<script>
    import GuideApply from './Test_Home.vue'

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
            }

        },
        data() {
            return {
                page: {
                    component: GuideApply,
                    label: '가이드 신청글'
                },

                name: '',
                comment: '',

                GuideRecruit:{
                    RecruitId: 1,
                    UserId: 1,
                    RecrutTitlevalue: "제주 흑돼지 맛집 잘아시는분!",
                    RecruitLocation: "제주시",
                    // RecruitDayandTime: Date().format("2019-05-08"),
                    RecruitPeopleNumber: 5,
                    RecruitContent: "흑돼지 쌉맛있는 식당 찾습니다 바로가~",
                    ApplyGuideList: "WorldClassGuide_인직"
                }

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
