<template>
    
</template>

<script>
    export default {
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