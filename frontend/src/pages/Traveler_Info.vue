<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-card>이메일 : {{user_info[0].Email}}</v-ons-card>
        <v-ons-card>이름 : {{user_info[0].Name}}</v-ons-card>
        <v-ons-card>핸드폰 번호 : {{user_info[0].PhoneNum}}</v-ons-card>
        <v-ons-card>카카오 ID : {{user_info[0].kakaoID}}</v-ons-card>
    </v-ons-page>
</template>

<script>

    export default {
        data() {
            return {
                user_id: this.$store.state.userid,
                user_info:[]
            };
        },
        beforeCreate(){
            this.$http.post('http://13.125.164.72:8000/checkInfo/guide', {
                params: {user: this.$store.state.userid}
            })
                .then((response) => {
                        this.user_info = response.data.data;
                        console.log(this.user_info);
                    },
                    (error) => { // error 를 보여줌
                        alert(error.response.data.error)
                    }
                )
                .catch(error => {
                    alert(error)
                });
        },
        methods: {
        }
    };
</script>

<style>
</style>