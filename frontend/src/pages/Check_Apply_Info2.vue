<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-list-header>{{user}} 의 글</v-ons-list-header>
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
                              @click="show_guide_info(user)"> 보기
                </v-ons-button>
                <v-ons-button class="hide_info" v-show="show_info === true" icon='fa-angle-up'
                              @click="show_guide_info(user)"> 숨기기
                </v-ons-button>
            </p>
        </v-ons-card>
        <div class="traveler" v-if="!session_type()">
            <v-ons-card v-for="todo in guide_apply_data">
                <img v-bind:src="'http://localhost:8000/'+todo.apply_Image_URL" alt="MSG" width="275" height="230">
                <v-ons-card>가격 : {{todo.SuggestPrice}}</v-ons-card>
                <v-ons-card>내용 : {{todo.SuggestContent}}</v-ons-card>
            </v-ons-card>
        </div>
        <!--<div class="traveler" v-if="session_type()">-->
            <!--아직 미구현입니다.-->
        <!--</div>-->
    </v-ons-page>
</template>

<script>
    export default {
        beforeCreate(){
            this.$http.post('http://localhost:8000/checkInfo/show2', {
                params: {
                    type: localStorage.getItem('newType'),
                    user: this.$store.state.user,
                    target: this.$store.state.target
                }
            })
                .then((response) => {  //로그인 성공;
                        if(localStorage.getItem('newType') === '가이드'){
                            this.guide_apply_data=response.data.data;
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
            session_type(){
                if(localStorage.getItem('newType') === '여행객'){
                    return true;
                }
                else{
                    return false;
                }
            },
            Confirm_Guide(){
                alert('확정!');
            }
        },
        data() {
            return {
                user: this.$store.state.user,
                target: this.$store.state.target,
                traveler_apply_data:[{
                }],
                guide_apply_data:[{
                    ApplyRecruitID: 0,
                    RecruitApplier: "",
                    SuggestContent: "",
                    SuggestPrice: 0,
                    apply_Image_URL: "",
                    apply_post_num: 0,
                }],
                show_info: false,
                guide_info: []
            };
        }
    }
</script>

<style scoped>

</style>