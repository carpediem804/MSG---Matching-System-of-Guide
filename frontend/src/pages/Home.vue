<template>
    <v-ons-page>

        <!--<v-ons-carousel auto-scroll fullscreen swipeable overscrollable-->
                        <!--:index.sync="carouselIndex">-->
            <!--<v-ons-carousel-item v-for="(value, key) in carouselItems" :key="key"-->
                                 <!--class="carousel-item"-->
                                 <!--:style="{ 'background-image': 'url('+value+')', 'background-color': 'white','background-repeat': 'no-repeat', 'background-position': 'center center', '-webkit-background-size': 'cover', '-moz-background-size': 'cover', '-o-background-size': 'cover',  'background-size': '93% 93%'}"-->
            <!--&gt;-->

            <!--</v-ons-carousel-item>-->
        <!--</v-ons-carousel>-->

        <!--<div class="dots">-->
        <!--<span v-for="dotIndex in Object.keys(carouselItems).length" :key="dotIndex"-->
              <!--@click="carouselIndex = dotIndex - 1">-->
          <!--{{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}-->
        <!--</span>-->
        <!--</div>-->


        <img class="back_image" src="../assets/homeImage3.png">
        <img class="back_image" src="../assets/homeImage2.png">
        <img class="back_image" src="../assets/homeImage1.png">


        <!--<img class="back_image" src="../assets/background3.jpg">-->

    </v-ons-page>
</template>

<script>
    export default {
        beforeCreate(){

            this.$http.post('http://13.125.164.72:8000/checkinfo/check/token', {
                params: {
                    id: localStorage.getItem("newEmail"),
                    token: localStorage.getItem("newToken")
                }
            }).then((response) => {
                //로그인 성공;
                console.log(response);
            },(error) => {
                // error 를 보여줌
                console.log(error);
            }).catch(error => {
                alert(error)
            })
        },
        head: {
            script: [
                { src: "http://code.jquery.com/jquery.min.js" },
                { src: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js" },
            ]
        },
        data() {
            return {
                carouselIndex: 0,

                carouselItems:{
                    a: "./src/assets/homeImage3.png",
                    b: "./src/assets/homeImage1.png",
                    c: "./src/assets/homeImage2.png",
                    // d: "/src/assets/background4.jpg",
                }
            };
        },
        methods: {

            // createImage(src) {
            //     var img = document.createElement("img");
            //     img.src = src;
            // },

            Alarm(id, comment){
                this.$http.post('http://13.125.164.72:8000/checkinfo/alarm', {
                    params: {
                        target: id,
                        comment: comment
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
            }
        }
    };
</script>
<style>
    .carousel-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    .color-tag {
        color: #fff;
        font-size: 48px;
        font-weight: bold;
        text-transform: uppercase;
    }
    .dots {
        text-align: center;
        font-size: 20px;
        color: #fff;
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
    }
    .dots > span {
        cursor: pointer;
    }
    .home{
        background-color: #CCEEFF;
    }
    .back_image {
        width: 100%;
        max-width: 600px;
        height: auto;
    }
</style>