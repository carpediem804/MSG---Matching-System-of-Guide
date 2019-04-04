<template>
    <div class="home22">
    </div>
</template>

<script>
    export default {
        name: 'home22',
        components: {
        },
        beforeCreate: function () {
            // console.log("잠깐 들려유.");
            if (!this.$session.exists()) {
                this.$router.push('/')
            }
            else{
                this.$router.push('/temp')
            }
        },
        data : function(){
            return {
            }
        }, ///데이터
        methods :{
        }///메소드

    }
</script>