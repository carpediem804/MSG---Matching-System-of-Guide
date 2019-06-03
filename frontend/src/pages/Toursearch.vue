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

        <v-ons-modal :visible="modalVisible" >
            <p style="text-align: right">
            <button class="send-image" color="secondary" icon="close" @click="closesearch()">close</button>
            <p style="text-align: center">

                <img class="profile-image" :src="userImage" width="275" height="230"/>

                <div v-if="!userImage">
                    <input type="file" round class="change-profile-image" @change="onFileChange" />
                </div>
                <div v-else>
                    <button class="delete-profile-image" color="secondary" icon="delete" @click="removeImage">Delete</button>
                </div>
            <button class="send-image" color="secondary" icon="delete" @click="sendimgage()">Search</button>
        </v-ons-modal>

    </div>
    <v-ons-button class="imageregist"  @click="imagesearch()">Image Search</v-ons-button>
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
    import axios from 'axios'

    export default {
        methods: {
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files
                this.selectedFile = e.target.files[0];
                if (!files.length) {
                    return
                }
                this.createImage(files[0])
                console.log('이미지올림');
                console.log(files[0].name);
                console.log(this.selectedFile.name);


            },

            createImage(file) {
                var reader = new FileReader()
                var vm = this

                reader.onload = (e) => {
                    vm.userImage = e.target.result

                }
                reader.readAsDataURL(file)

            },
            removeImage: function (e) {
                this.userImage = ''
            },
            imagesearch(){
                    this.modalVisible = true;
                  //  clearTimeout(this.timeoutID);
                 //  this.timeoutID = setTimeout(() => this.modalVisible = false, 2000);
            },
            closesearch(){
                this.modalVisible =false;
                this.removeImage();
            },
            sendimgage(){
                axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
                let formData = new FormData();
                formData.append('file',this.selectedFile);
                axios.post('http://localhost:8000/imagesearch',formData,{
                    params: {


                    }
                }).then(function(data){
                    console.log("register TourItem complete");
                });
                this.$ons.notification.alert({
                    message: "이미지 검색",
                    title: "이미지검색",
                    callback: function (index) {
                         // location.reload();
                    },
                })
                // location.reload();
                this.removeImage();
                this.modalVisible = false;
            },
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
                    modalVisible: false,
                    timeoutID: 0,
                    userImage: '',
                    selectedFile:null,
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
                    Landmarks:
                        { locations: [ { latLng: [Object] } ],
                            properties: [],
                            mid: '/m/0cn46',
                            locale: '',
                            description: 'Piazza dei Miracoli',
                            score: 0.6560990214347839,
                            confidence: 0,
                            topicality: 0,
                            boundingPoly:
                                { vertices: [ [Object], [Object], [Object], [Object] ],
                                    normalizedVertices: [] }
                        },
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
                }),

                    this.$http.get('http://localhost:8000/imagesearch').then(res => {
                        console.log("보냇다 보냇다~ ")
                        this.Landmarks = res.data.Landmarks;
                        console.log(this.Landmarks.description);
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