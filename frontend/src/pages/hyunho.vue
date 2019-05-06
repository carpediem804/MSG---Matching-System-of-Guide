<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>

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

            <v-ons-button @click="categories[0] = search; categories[1]= selectedLocal; categories[2]= selectedThema" class="button-margin">Search</v-ons-button>

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
        <v-ons-card>
            <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" style="width: 100%">
            <div class="title">
                BBauk tour
            </div>
            <div class="content">
                <div>
                    <v-ons-button @click="$ons.notification.alert('Hello, world!')" ><v-ons-icon icon="ion-thumbsup"></v-ons-icon></v-ons-button>
                    <v-ons-button @click=" Localsearch= '서울'; Themasearch = '효도'"><v-ons-icon icon="ion-share"></v-ons-icon></v-ons-button>
                </div>
                <v-ons-list>
                    <v-ons-list-header>TourInfo</v-ons-list-header>
                    <v-ons-list-item ># {{Localsearch}} #{{Themasearch}} #컴온베이비~</v-ons-list-item>
                    <v-ons-list-item>max: 10인</v-ons-list-item>
                </v-ons-list>
            </div>
        </v-ons-card>
            <v-ons-card>
                <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" style="width: 100%">
                <div class="title">
                    Awesome tour
                </div>
                <div class="content">
                    <div>
                        <v-ons-button><v-ons-icon icon="ion-thumbsup"></v-ons-icon></v-ons-button>
                        <v-ons-button><v-ons-icon icon="ion-share"></v-ons-icon></v-ons-button>
                    </div>
                    <v-ons-list>
                        <v-ons-list-header>TourInfo</v-ons-list-header>
                        <v-ons-list-item>#대전 #힐링 #사나이 킹키훈~</v-ons-list-item>
                        <v-ons-list-item>max: 10인</v-ons-list-item>
                    </v-ons-list>
                </div>
            </v-ons-card>
            <v-ons-card>
                <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" style="width: 100%">
                <div class="title">
                    Awesome tour
                </div>
                <div class="content">
                    <div>
                        <v-ons-button><v-ons-icon icon="ion-thumbsup"></v-ons-icon></v-ons-button>
                        <v-ons-button><v-ons-icon icon="ion-share"></v-ons-icon></v-ons-button>
                    </div>
                    <v-ons-list>
                        <v-ons-list-header>TourInfo</v-ons-list-header>
                        <v-ons-list-item>#대구 #효도 #헬로~</v-ons-list-item>
                        <v-ons-list-item>max: 10인</v-ons-list-item>
                    </v-ons-list>
                </div>
            </v-ons-card>
        </v-ons-list-item>

    </v-ons-page>
</template>

<script>
    export default {
        created(){
            this.$http.get('http://localhost:8000/getTourList').then(res=>{
                console.log("보냇다 보냇다~ ")
                console.log(res)
            }).catch(res=>{
                console.log(res)
            })
        },
        data() {
            return {
                categories:[],

                search: '',
                spdOpen: false,
                Localsearch: 'hi',
                Themasearch: 'll',
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
        methods:{
            'exa': function () {
                Localsearch ='서울'
                Themasearch= '효도'
                alert('Hello ' )
            }
        }


    };
</script>

<style scoped>
    .button-margin {
        margin: 6px 0;
    }
</style>