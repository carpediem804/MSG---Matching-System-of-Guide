<template>
<v-ons-page>
    <div class="test2" align="center">
        <v-ons-search-input maxlength="100" placeholder="Keywords" v-model="search"></v-ons-search-input>
        <div></div>
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
    <p align="right">
        <v-ons-button class="maketourbutton" v-if="session_existed()" icon='ion-edit'
                      @click="push(page.component, page.label)"> 투어상품 작성하기
        </v-ons-button>
    </p>

    <!--//보기 정렬-->
    <div class="button-group">
        <div class="buttons" align="right">
            <span>view</span>
            <button v-for="b in buttons.view" v-bind:title="b.title"
                    v-bind:class="viewType == b.class?'selected':''"
                    v-on:click="toggleList('view',b.class)">
                <i class="fas" v-bind:class="'fa-'+b.class"></i>
            </button>
            <span>sort</span>
            <button v-for="b in buttons.sort" v-bind:title="b.title"
                    v-bind:class="sortType == b.class?'selected':''"
                    v-on:click="toggleList('sort',b.class)">
                <i class="fas" v-bind:class="'fa-'+b.class"></i>
            </button>
        </div>
    </div>

    <v-ons-list v-if="viewType ==='list'">

        <v-ons-list-item v-for="todo in filtered" @click="push(page2.component, page2.label, todo)"  >
            <div class="title2">
                <strong>  {{todo.TourTitle}} </strong><br>
            </div>
            # {{todo.TourNowPeopleNum}}명 / {{todo.TourMaxNum}}명
            &nbsp;# {{todo.TourPrice}}원 <br>
            # {{todo.TourLocation}}    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # {{todo.TourThema}}
        </v-ons-list-item>

    </v-ons-list>

    <v-ons-list v-else>
        <v-ons-card v-for="todo in filtered" @click="push(page2.component, page2.label, todo)"  >
            <img v-bind:src="'http://localhost:8000/'+todo.TourImageURL" alt="MSG" width="275" height="230">
            <v-ons-button ><v-ons-icon icon="ion-thumbsup"></v-ons-icon></v-ons-button>
            <v-ons-button ><v-ons-icon icon="ion-share"></v-ons-icon></v-ons-button>
            <div>&nbsp;</div>
            <div class="title2">
                <strong>  {{todo.TourTitle}} </strong>
            </div>
            <div class="test2" align="right">{{todo.TourNowPeopleNum}}명 / {{todo.TourMaxNum}}명</div>
            <div class="content2">

                <v-ons-list>
                    <v-ons-list-item ># {{todo.TourPrice}}\  </v-ons-list-item>
                    <v-ons-list-item ># {{todo.TourLocation}}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # {{todo.TourThema}} </v-ons-list-item>
                    <v-ons-list-item class="conte" ># {{todo.TourContent}}</v-ons-list-item>
                </v-ons-list>
            </div>
        </v-ons-card>

    </v-ons-list>




</v-ons-page>
</template>

<script>

    import MakeTourItem from "./MakeTourItem.vue";
    import TourInfo from "./TourInfo.vue";

    export default {
        methods: {
            push(page, key,tour) {
                this.$store.state.tour = tour;
                console.log(localStorage.getItem('newType'));
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
                if (localStorage.getItem('newType') === '가이드') {
                    return true;
                }
                return false;
            },
            test_func() {
                console.log(this.categories.length);
                while (this.filtered.length !== 0) {
                    this.filtered.pop();
                }
                console.log(this.filtered.length)
                console.log(this.categories.length);
                var a = true;
                var b = true;
                var c = true;
                for (var i = 0; i < this.categories.length; i++) {
                    if(this.search === "")
                    {a = false;}
                    if(this.selectedLocal === "미설정")
                    {b= false;}
                    if(this.selectedThema === "미설정")
                    {c= false;}
                    if(a){
                        if(b){
                            if(c){
                                if((this.categories[i].TourLocation === this.selectedLocal) && (this.categories[i].TourTitle.includes(this.search) ) && this.categories[i].includes(this.search)){
                                    console.log('abc');

                                    this.filtered.push( this.categories[i]);
                                   // console.log(this.filtered.TourImageURL[i]);
                                }
                            } // abc
                            else{
                                if((this.categories[i].TourLocation === this.selectedLocal) &&
                                    ((this.categories[i].TourTitle.includes(this.search)) || (this.categories[i].TourContent.includes(this.search)))){
                                    console.log('ab');
                                    this.filtered.push( this.categories[i]);
                                }
                            }//ab
                        }
                        else{
                            if(c){
                                if(((this.categories[i].TourTitle.includes(this.search)) || (this.categories[i].TourContent.includes(this.search))) &&
                                    (this.categories[i].TourThema === this.selectedThema)){
                                    console.log('ac');
                                    this.filtered.push( this.categories[i]);
                                }
                            }//ac
                            else{
                                if((this.categories[i].TourTitle.includes(this.search) ) || (this.categories[i].TourContent.includes(this.search))){
                                    console.log('a');
                                    this.filtered.push( this.categories[i]);
                                }
                            }//a
                        }
                    }//a true
                    else{
                        if(b){
                            if(c){
                                if((this.categories[i].TourLocation === this.selectedLocal) && (this.categories[i].TourTitle.includes(this.search) )){
                                    console.log('bc');
                                    this.filtered.push( this.categories[i]);
                                }
                            }//bc
                            else{
                                if((this.categories[i].TourLocation === this.selectedLocal)){
                                    console.log('b');
                                    this.filtered.push( this.categories[i]);
                                }
                            }//b
                        }
                        else{
                            if(c){
                                if((this.categories[i].TourTitle.includes(this.search) )){
                                    console.log('c');
                                    this.filtered.push( this.categories[i]);
                                }//c
                            }
                            else{
                                console.log('zero');
                                this.filtered.push( this.categories[i]);
                            }// nothing
                        }
                    }
                } //검색엔진
                console.log(this.filtered)
                if(this.filtered.length !== 0){
                    alert("Items Searched !! ");
                }
                else {
                    alert("No items !! ");
                }

            },//test_func()
            toggleList: function (type, className) {
                switch (type) {
                    case 'view':
                        this.viewType = className;
                        break;
                    case 'sort':
                        this.sortType = className;

                        if(className === 'sort-alpha-down')
                            this.filtered.sort(function(a,b){return a['deadline']>b['deadline']});
                        else if(className === 'sort-numeric-down')
                            this.filtered.sort(function (a,b){return a['price']<b['price']});
                        else if(className === 'star')
                            this.filtered.sort(function (a,b){return a['TourPrice']<b['TourPrice']});



                }
            }

        },

            data() {
                return {
                    nowDate: Date.now(),
                    viewimg:"http://localhost:8000/uploads/",
                    fakeimg: "file-1544454352258.png",
                    page: {
                        component: MakeTourItem,
                        label: '투어상품 등록'
                    },

                    page2: {
                        component: TourInfo,
                        label: '투어상품'
                    },
                    filtered: [
                        {
                            TourContent: "",
                            TourDayandTime: "",
                            TourImageURL: "http://localhost:8000/",
                            TourLocation: "",
                            TourThema: '',
                            TourMaxNum: 10,
                            TourMinNum: 5,
                            TourNowPeopleNum: 0,
                            TourNum: 0,
                            TourPrice: 150000,
                            TourTitle: "title",
                            Tour_create_date: "2019-05-06T07:10:20.163Z",
                            UserID: "kki",

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
                            UserID: "kki",

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
                        {value: '부산', text: '부산'},
                        {value: '수원', text: '수원'},
                    ],
                    selectedLocal: '미설정',

                    themaitems: [
                        {value: '미설정', text: 'Thema'},
                        {value: '힐링', text: '힐링'},
                        {value: '쇼핑', text: '쇼핑'},
                        {value: '운동', text: '운동'},
                        {value: '관광', text: '관광'},
                        {value: '맛집', text: '맛집'},
                        {value: '교육', text: '교육'},
                    ],
                    //보기, 정렬
                    selectedThema: '미설정',
                    viewType:'th-large',
                    sortType:'sort-numeric-up',
                    buttons:{
                        'view':[
                            {'class': 'list', 'title':'view in list', selected:false},
                            {'class': 'th-large', 'title':'view in thumbnail', selected:true}
                        ],
                        'sort':[
                            {'class':'sort-alpha-down','title':'sort by deadline',selected:true},
                            {'class':'sort-numeric-down','title':'sort by price', selected:false},
                            {'class':'star','title':'sort by star',selected:false},
                        ]
                    }

                };
            },
            beforeCreate() {
                this.$http.get('http://localhost:8000/getTourList/custom').then(res => {
                    console.log("보냇다 보냇다~ ")
                    this.categories = res.data.tourdata;

                    this.filtered.pop( );
                    for (var i = 0; i < this.categories.length; i++) {
                        // if(this.categories[i].TourImageURL ==="아직구현안함")
                        // {this.categories[i].TourImageURL = this.fakeimg;}
                        this.filtered.push( this.categories[i]);


                    }
                   // console.log(this.filtered)
                   console.log(this.categories)
                    console.log(this.viewimg)
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
    .conte{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 300px;
        }

</style>