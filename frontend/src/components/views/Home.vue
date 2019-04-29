<template>
    <div class="home">
        <h1 style="font-size: 40px; color: #A9BCF5">MSG</h1>
        <h2 style="font-size: 15px">(Matching System of Guide)</h2>
        <br><br><br>
        <button class="buttons1" v-on:click="jump1"> 여행 상품 보기 </button>
        <button class="buttons2" v-on:click="jump2"> 가이드 모집 </button>
        <br><br><br>
    </div>
</template>

<script>
    // @ is an alias to /src
    //import HelloWorld from '@/components/HelloWorld.vue'
    export default {
        name: 'home',
        components: {

        },
        beforeCreate: function () {
            if (this.$session.exists()) {
                // this.$router.push('/login/test')
            }
        },
        data : function(){
            return {
                add_patient_name:"",
                waiting_list:[],
                doing_list:[]
            }
        }, ///데이터
        methods :{
            jump1:function(){
                this.$router.push('/toursearch')
            },
            jump2:function(){
                this.$router.push('/search')
            }
        }///메소드

    }
</script>

<style>
    .buttons1{

        width:200px;
        height: 200px;

        background-color: #80FF00;

        border: none;

        color:#fff;

        padding: 15px 0;

        text-align: center;

        text-decoration: none;

        display: inline-block;

        font-size: 20px;

        margin: 10px;

        cursor: pointer;

        border-radius:10px;
    }
    .buttons2 {

        width: 200px;
        height: 200px;

        background-color: #0080FF;

        border: none;

        color: #fff;

        padding: 15px 0;

        text-align: center;

        text-decoration: none;

        display: inline-block;

        font-size: 20px;

        margin: 10px;

        cursor: pointer;

        border-radius:10px;
    }
</style>
