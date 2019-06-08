<template>
  <v-ons-page>
    <div class="home" align="center">
      <img class="back_image" src="../assets/background2.jpg">
      <img class="back_image" src="../assets/backgruond1.jpg">
      <img class="back_image" src="../assets/background4.jpg">
      <img class="back_image" src="../assets/background3.jpg">
    </div>
  </v-ons-page>
</template>

<script>
export default {
  beforeCreate(){
    this.$http.post('http://localhost:8000/checkinfo/check/token', {
      params: {
        id: localStorage.getItem("newEmail"),
        token: localStorage.getItem("newToken")
      }
    })
            .then((response) => {  //로그인 성공;
                     console.log(response);
                    },
                    (error) => { // error 를 보여줌
                      console.log(error);
                    }
            )
            .catch(error => {
              alert(error)
            })
  },
  data() {
    return {
  };
  },
  methods: {
  }
};
</script>
<style>
    .home{
     background-color: #CCEEFF;
    }
  .back_image {
    width: 100%;
    max-width: 600px;
    height: auto;
  }
</style>
