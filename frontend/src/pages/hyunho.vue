<template>
<v-ons-page>
    <div class="test2" align="center">
        <v-ons-search-input maxlength="20" placeholder="Search" v-model="search"></v-ons-search-input>

        <v-ons-select style="width: 80px" v-model ="selectedLocal " >
            <option v-for="loitem in localitems"  :value="loitem.value" >
                {{ loitem.text }}
            </option>
        </v-ons-select>

        <v-ons-select style="width: 80px" v-model="selectedThema" >
            <option v-for="thitem in themaitems"  :value="thitem.value" >
                {{ thitem.text }}
            </option>
        </v-ons-select>

        <v-ons-button class="button-margin"  @click="test_func()">Search</v-ons-button>
    </div>

    <v-ons-list-item>
        <v-ons-card v-for="item in categories">
            <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" style="width: 100%">
            <div class="title">
                {{item.TourTitle}}
            </div>
            <div class="test" align="right">{{item.TourNowPeopleNum}}명 / {{item.TourMaxNum}}명</div>
            <div class="content">
                <div>
                    <v-ons-button ><v-ons-icon icon="ion-thumbsup"></v-ons-icon></v-ons-button>
                    <v-ons-button ><v-ons-icon icon="ion-share"></v-ons-icon></v-ons-button>
                </div>
                <v-ons-list>
                    <v-ons-list-item ># {{item.TourLocation}} # {{item.TourThema}} </v-ons-list-item>
                    <v-ons-list-item># {{item.TourContent}}</v-ons-list-item>
                    <v-ons-list-item># ${{item.TourPrice}}  </v-ons-list-item>
                </v-ons-list>
            </div>

        </v-ons-card>
    </v-ons-list-item>
    <v-ons-list-item>
        <v-ons-card v-for="todo in filtered">
            <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" style="width: 100%">
            <div class="title2">
                {{todo.TourTitle}}
            </div>
            <div class="test2" align="right">{{todo.TourNowPeopleNum}}명 / {{todo.TourMaxNum}}명</div>
            <div class="content2">
                <div>
                    <v-ons-button ><v-ons-icon icon="ion-thumbsup"></v-ons-icon></v-ons-button>
                    <v-ons-button ><v-ons-icon icon="ion-share"></v-ons-icon></v-ons-button>
                </div>
                <v-ons-list>
                    <v-ons-list-item ># {{todo.TourLocation}} # {{todo.TourThema}} </v-ons-list-item>
                    <v-ons-list-item># {{todo.TourContent}}</v-ons-list-item>
                    <v-ons-list-item># {{todo.TourPrice}}$  </v-ons-list-item>
                </v-ons-list>
            </div>
        </v-ons-card>
    </v-ons-list-item>

        <p align="right">
            <v-ons-button class="assign_button2" v-if="session_existed()" icon='ion-edit'
                          @click="push(page.component, page.label)"> 투어상품 작성하기
            </v-ons-button>
        </p>


</v-ons-page>
</template>

<script>

    import MakeTourItem from "./MakeTourItem.vue";

    export default {
        methods: {
            push(page, key) {
                this.$store.commit('navigator/push', {
                    extends: page,
                    data() {
                        return {
                            toolbarInfo: {
                                backLabel: 'Back',
                                title: key
                            }
                        }
                    }
                });
            },
            session_existed() {
                if (localStorage.getItem('newUser') == null) {
                    return true;
                }
                return false;
            },
            test_func() {
                console.log(this.filtered.length);
                while (this.filtered.length !== 0) {
                    this.filtered.pop();
                }
                for (var i = 0; i < this.categories.length; i++) {
                    if ((this.categories[i].TourLocation === (this.selectedLocal) )|| (this.categories[i].TourThema === (this.selectedThema))
                        || (this.categories[i].TourTitle.includes(this.search)) || (this.categories[i].TourContent.includes(this.search))) {
                        this.filtered.push({
                            TourContent: this.categories[i].TourContent,
                            TourDayandTime: this.categories[i].TourDayandTime,
                            TourImageURL: this.categories[i].TourImageURL,
                            TourLocation: this.categories[i].TourLocation,
                            TourThema: this.categories[i].TourThema,
                            TourMaxNum: this.categories[i].TourMaxNum,
                            TourMinNum: this.categories[i].TourMinNum,
                            TourNowPeopleNum: this.categories[i].TourNowPeopleNum,
                            TourNum: this.categories[i].TourNum,
                            TourPrice: this.categories[i].TourPrice,
                            TourTitle: this.categories[i].TourTitle,
                            Tour_create_date: this.categories[i].Tour_create_date,
                            UserID: this.categories[i].UserID
                        });
                    }
                }
                if(this.filtered.length !== 0){
                    alert("Items Searched !! ");
                }
                else {
                    alert("No items !! ");
                }

            }
        },

            data() {
                return {

                    page: {
                        component: MakeTourItem,
                        label: '투어상품 등록'
                    },
                    filtered: [
                        {
                            TourContent: "content",
                            TourDayandTime: "2019-05-06T07:10:20.163Z",
                            TourImageURL: "ABCD",
                            TourLocation: "Local",
                            TourThema: 'Thema',
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
                    categories: [
                        {
                            TourContent: "content",
                            TourDayandTime: "2019-05-06T07:10:20.163Z",
                            TourImageURL: "ABCD",
                            TourLocation: "Local",
                            TourThema: 'Thema',
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
                        {value: '미설정', text: 'Local'},
                        {value: '서울', text: '서울'},
                        {value: '인천', text: '인천'},
                        {value: '대전', text: '대전'},
                        {value: '대구', text: '대구'},
                        {value: '부산', text: '부산'}
                    ],
                    selectedLocal: '미설정',

                    themaitems: [
                        {value: '미설정', text: 'Thema'},
                        {value: '힐링', text: '힐링'},
                        {value: '쇼핑', text: '쇼핑'},
                        {value: '효도', text: '효도'},
                        {value: '관광', text: '관광'},
                        {value: '맛집', text: '맛집'}
                    ],
                    selectedThema: '미설정'
                };
            },
            beforeCreate() {
                this.$http.get('http://localhost:8000/getTourList/custom').then(res => {
                    console.log("보냇다 보냇다~ ")
                    this.categories = res.data.tourdata;
                    console.log(this.categories)
                    console.log(res)
                }).catch(res => {
                    console.log(res)
                })
            },


    }
</script>

<style scoped>
    .button-margin {
        margin: 6px 0;
    }
</style>