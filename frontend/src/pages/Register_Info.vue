<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div class="travler" v-if="session_type()">
            <p align="right">
                <v-ons-button class="Delete_button" icon="trash"
                              @click="delete_info()"> 삭제하기
                </v-ons-button>
            </p>
            <v-ons-card>작성자 : {{item.UserID }}</v-ons-card>
            <v-ons-card>제목 : {{item.RecruitTitle}}</v-ons-card>
            <v-ons-card>지역 : {{item.RecruitLocation}}</v-ons-card>
            <v-ons-card>내용 : {{item.RecruitContent}}</v-ons-card>
            <v-ons-card>날짜 : {{item.From_time}} 부터 {{item.To_time}} 까지</v-ons-card>
            <v-ons-card>인원 : {{item.RecruitPeopleNumber}}</v-ons-card>
            <v-ons-card>작성시간 : {{item.WriteTime}}</v-ons-card>
        </div>
        <div class="travler" v-if="!session_type()">
            <p align="right">
                <v-ons-button class="Delete_button" icon="trash"
                              @click="delete_info()"> 삭제하기
                </v-ons-button>
            </p>
            <v-ons-card>작성자 : {{item.UserID }}</v-ons-card>
            <v-ons-card>제목 : {{item.TourTitle}}</v-ons-card>
            <v-ons-card>지역 : {{item.TourLocation}}</v-ons-card>
            <v-ons-card>테마 : {{item.TourThema}}</v-ons-card>
            <v-ons-card>내용 : {{item.TourContent}}</v-ons-card>
            <v-ons-card>날짜 : {{item.TourDayandTime_start}} 부터 {{item.TourDayandTime_end}} 까지</v-ons-card>
            <v-ons-card>최소인원 : {{item.TourMinNum}}</v-ons-card>
            <v-ons-card>최대인원 : {{item.TourMaxNum}}</v-ons-card>
            <v-ons-card>가격 : {{item.TourPrice}}</v-ons-card>
            <v-ons-card>작성시간 : {{item.Tour_create_date}}</v-ons-card>
        </div>
    </v-ons-page>
</template>

<script>
    export default {
        methods: {
            session_type(){
                if(localStorage.getItem('newType') === '여행객'){
                    return true;
                }
                else{
                    return false;
                }
            },
            delete_info(){
                this.$http.post('http://localhost:8000/checkInfo/delete', {
                    item: this.item
                })
                    .then(response => {  //로그인 성공
                            alert("삭제되었습니다.");
                            location.reload();
                        },
                        (error) => { // error 를 보여줌
                            alert(error.response.data.error)
                        }
                    )
                    .catch(error => {
                        alert(error)
                    })
            }
        },
        data() {
            return {
                item : this.$store.state.item
            };
        }
    };
</script>

<style scoped>
</style>