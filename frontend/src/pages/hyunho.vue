<template>
    <v-ons-page>

        <v-ons-header class ="center">TourSearch</v-ons-header>


        <v-ons-list-item :modifier="md ? 'nodivider' : ''">


            <v-ons-search-input maxlength="20" placeholder="Search" v-model="search"></v-ons-search-input>

            <v-ons-select style="width: 120px" v-model ="selectedLocal " >
                <option v-for="loitem in localitems"  :value="loitem.value" >
                    {{ loitem.text }}
                </option>
            </v-ons-select>

            <v-ons-select style="width: 120px" v-model="selectedThema" >
                <option v-for="thitem in themaitems"  :value="thitem.value" >
                    {{ thitem.text }}
                </option>
            </v-ons-select>

            <v-ons-button class="button-margin">Search</v-ons-button>

        </v-ons-list-item>

        <v-ons-list-item>
            <div class="center">
                Local is {{ selectedLocal }} !
            </div>
        </v-ons-list-item>
        <v-ons-list-item>
            <div class="center">
                Thema is {{ selectedThema }} !!!!
            </div>
        </v-ons-list-item>
        <v-ons-list-item>

            <div class="right right-label">
                Hello {{ search || 'blabla' }}!<v-ons-icon icon="fa-hand-spock-o" size="lg" class="right-icon"></v-ons-icon>
            </div>

        </v-ons-list-item>
        <v-ons-list-item>
        <v-ons-card v-for="item in categories">
            <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" style="width: 100%">
            <div class="title">
                {{categories.TourTitle}}
            </div>
            <div class="content">
                <div>
                    <v-ons-button @click="$ons.notification.alert('Hello, world!')" ><v-ons-icon icon="ion-thumbsup"></v-ons-icon></v-ons-button>
                    <v-ons-button ><v-ons-icon icon="ion-share"></v-ons-icon></v-ons-button>
                </div>
                <v-ons-list>
                    <v-ons-list-header>TourInfo</v-ons-list-header>
                    <!--<div class = "right right-label">{{categories.TourNowPeopleNum}} / {{categories.TourMaxNum}}</div>-->
                    <v-ons-list-item ># {{categories.TourLocation}} # {{categories.TourLocation}} # {{categories.TourContent}}</v-ons-list-item>
                    <v-ons-list-item># Min: {{categories.TourMinNum}}명  </v-ons-list-item>
                </v-ons-list>
            </div>
        </v-ons-card>


        </v-ons-list-item>

    </v-ons-page>
</template>

<script>
    export default {

        data() {
            return {
                categories:[
                    {
                        TourContent: "content",
                        TourDayandTime: "2019-05-06T07:10:20.163Z",
                        TourImageURL: "ABCD",
                        TourLocation: "Local",
                        TourThema:'Thema',
                        TourMaxNum: 10,
                        TourMinNum: 5,
                        TourNowPeopleNum: 0,
                        TourNum: 0,
                        TourPrice: 150000,
                        TourTitle: "title",
                        Tour_create_date: "2019-05-06T07:10:20.163Z",
                        UserID: "kki"
                    }
                ],

                search: '',
                spdOpen: false,
                localitems: [
                    { value: '미설정', text: 'Local' },
                    { value: '서울', text: '서울' },
                    { value: '인천', text: '인천' },
                    { value: '대전', text: '대전' },
                    { value: '대구', text: '대구' },
                    { value: '부산', text: '부산' }
                ],
                selectedLocal: '미설정',

                themaitems: [
                    { value: '미설정', text: 'Thema' },
                    { value: '힐링', text: '힐링' },
                    { value: '쇼핑', text: '쇼핑' },
                    { value: '효도', text: '효도' },
                    { value: '관광', text: '관광' },
                    { value: '맛집', text: '맛집' }
                ],
                selectedThema: '미설정'
            };
        },
        beforeCreate(){
            this.$http.get('http://localhost:8000/getTourList').then(res=>{
                console.log("보냇다 보냇다~ ")
                this.categories = res.data.tourdata;
                console.log(this.categories)
                console.log(res)
            }).catch(res=>{
                console.log(res)
            })
        },

    };
</script>

<style scoped>
    .button-margin {
        margin: 6px 0;
    }
</style>