<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-list-header>{{user}} 의 글</v-ons-list-header>
        <div class="traveler" v-if="session_type()">
            <v-ons-card v-for="todo in guide_apply_data">
                <img v-bind:src="'http://localhost:8000/'+todo.apply_Image_URL" alt="MSG" width="275" height="230">
            <v-ons-card>가격 : {{todo.SuggestPrice}}</v-ons-card>
            <v-ons-card>내용 : {{todo.SuggestContent}}</v-ons-card>
            </v-ons-card>
            <p align="center">
                <v-ons-button class="ConfirmGuide" icon='fa-check'
                              @click="Confirm_Guide()"> 확정하기
                </v-ons-button>
            </p>
        </div>
        <div class="traveler" v-if="!session_type()">
            아직 미구현입니다.
        </div>
    </v-ons-page>
</template>

<script>
    export default {
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
                }]
            };
        }
    }
</script>

<style scoped>

</style>