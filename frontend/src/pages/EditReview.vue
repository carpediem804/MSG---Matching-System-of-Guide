<template>
    <v-ons-page>

        <custom-toolbar v-bind="toolbarInfo">리뷰</custom-toolbar>

            <v-ons-list v-for="todo in prereview" style="background: #eceff1">
                <v-ons-list-header >{{todo.preuserID}}
                <v-ons-icon v-for="n in Math.floor(todo.prestar)" icon="fa-star" style="color: gold"></v-ons-icon>
                <v-ons-icon v-if="count(todo.prestar)" icon="fa-star-half-alt" style="color: gold">{{toreview.prestar}} 점</v-ons-icon>
                {{todo.prestar}}점 </v-ons-list-header>
                <v-ons-list-item style="width: auto">{{todo.pretext}}</v-ons-list-item>
            </v-ons-list>

            <v-ons-card :modifier="md ? 'nodivider' : ''">

                <div>
                    {{myID}}<br>
                    평점 : <v-ons-input maxlength="20"
                                 placeholder="평점"
                                 v-model="myreview.mystar"></v-ons-input>

                    <textarea name="content" v-model="myreview.mytext" cols="30" rows="5" placeholder="리뷰를 남겨주세요."></textarea>
                    <v-ons-button align="right" @click="submit2()">Submit</v-ons-button>
                </div>
            </v-ons-card>


    </v-ons-page>
</template>

<script>
    import firebase from 'firebase'
    import axios from 'axios'
    export default {
        methods: {
            count(counter){
                var temp = counter;
                temp = temp - Math.floor(counter);
                if(temp>0)
                {this.checkGrade= true;}
                else
                    this.checkGrade =false;

                return this.checkGrade;
            },
            submit2(){
                console.log(this.myreview.mytext);
                console.log(this.myreview.mystar);
                console.log(this.myID);
                console.log("user: "+ this.$store.state.guideid);
                //console.log(this.user);
                axios.post('http://localhost:8000/review',{
                    params: {
                        mytext : this.myreview.mytext,
                        mystar : this.myreview.mystar,
                        myuserID: this.myID,
                        guideID: this.$store.state.guideid
                    }
                }).then(function(data){
                    console.log("던졋다");

                    alert('제출되었습니다.');
                })


               // location.reload();
            }
        },
        data(){
            return{
                guide: this.$store.state.guideid,
                myID: localStorage.getItem('newEmail'),
                checkGrade : false,
                prereview : [{
                    pretext: "review",
                    prestar: 1,
                    preuserID: "User1"
                },
                    {
                        pretext: "review2",
                        prestar: 2,
                        preuserID: "User2"
                    },
                ],
                myreview : [{
                    mytext: "",
                    mystar: Number,
                }]
            }

        },
        // beforeCreate() {
        //     this.$http.get('http://localhost:8000/getTourList/custom').then(res => {
        //         console.log("리뷰리뷰~ ")
        //         //this.prereview = res.data.tourdata; 주소정하자
        //
        //     }).catch(res => {
        //         console.log(res)
        //     })
        //
        // },
    }
</script>

<style scoped>

</style>