<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <v-ons-list-header>신청 정보</v-ons-list-header>
        <v-ons-card>작성자 : {{user}}</v-ons-card>
        <v-ons-card>타겟 : {{target}}</v-ons-card>
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
                       //여기에 넣자.
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

        },
        data() {
            return {
                user: this.$store.state.user,
                target: this.$store.state.target
            };
        }
    }
</script>

<style scoped>

</style>