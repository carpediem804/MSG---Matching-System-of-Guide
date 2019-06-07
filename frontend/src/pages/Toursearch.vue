<template>
<v-ons-page>
    <div class="test2" align="center">
        <p align="left">
            &nbsp;&nbsp;&nbsp;&nbsp;
        <v-ons-select class="select" v-model ="selectedLocal " >
            <option v-for="loitem in localitems"  :value="loitem.value" >
                {{ loitem.text }}
            </option>
        </v-ons-select> 

        <v-ons-select class="select" v-model="selectedThema" >
            <option v-for="thitem in themaitems"  :value="thitem.value" >
                {{ thitem.text }}
            </option>
        </v-ons-select>
        </p>
        <v-ons-search-input maxlength="100" placeholder="Keywords" v-model="search"></v-ons-search-input>
        <v-ons-button class="button-margin"  @click="test_func()">Search</v-ons-button>
        <!--<v-ons-button class="button-margin"  @click="test_clear()">Clear</v-ons-button>-->
        <p align="right">
            <v-ons-button class="button-margin"  @click="imagesearch()">Image</v-ons-button>
            <v-ons-button class="button-margin" v-if="session_existed()" icon='ion-edit'
                          @click="push(page.component, page.label)"> 투어상품 작성하기
            </v-ons-button>
        </p>
        <v-ons-modal :visible="modalVisible" >
            <p style="text-align: right">
            <v-ons-icon class="send-image" size="30px" icon="close" @click="closesearch()"></v-ons-icon>&nbsp;&nbsp;&nbsp;&nbsp;
            <p style="text-align: center">

                <img class="profile-image" :src="userImage" width="275" height="230"/>

                <div v-if="!userImage">
                    <input type="file" round class="change-profile-image" @change="onFileChange" />
                </div>
                <div v-else>
                    <div align="right">
                    <v-ons-button class="button-margin" icon="trash" @click="removeImage">Delete</v-ons-button>&nbsp;&nbsp;
                    </div>
                    <v-ons-button class="button-margin"  @click="sendimgage()">Search</v-ons-button>
                </div>
        </v-ons-modal>

    </div>
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

    <v-ons-list style="background: #efeff4" v-if="viewType ==='list'">

        <v-ons-card v-for="todo in filtered" @click="push(page2.component, page2.label, todo)"  >
            <div class="update_time" v-if="time_check(todo.TourNum,todo.TourState,todo.TourDayandTime_start) === 0">
            </div>
            <div class="title">
                <strong>  {{todo.TourTitle}} </strong><br>
            </div>
            # {{todo.TourNowPeopleNum}}명 / {{todo.TourMaxNum}}명
            &nbsp;# {{todo.TourPrice}}원 <br>
            # {{todo.TourLocation}}    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # {{todo.TourThema}}
            <br>
            # {{todo.TourDayandTime_start}}
            # {{test_time}}
        </v-ons-card>

    </v-ons-list>

    <v-ons-list style="background: #efeff4" v-else>
        <v-ons-card v-for="todo in filtered" @click="push(page2.component, page2.label, todo)"  >
            <div class="update_time" v-if="time_check(todo.TourNum,todo.TourState,todo.TourDayandTime_start) === 0">
            </div>
            <p align="center">
            <img v-bind:src="'http://localhost:8000/'+todo.TourImageURL" alt="MSG" width="300" height="230">
            <p align="center">
            <div class="title">
                <strong>  {{todo.TourTitle}} </strong>
            </div>
            <div align="right">{{todo.TourNowPeopleNum}}명 / {{todo.TourMaxNum}}명</div>
            <div class="content">
                <v-ons-list>
                    <v-ons-list-item ># {{todo.TourPrice}}\  </v-ons-list-item>
                    <v-ons-list-item ># {{todo.TourLocation}}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # {{todo.TourThema}} </v-ons-list-item>
                    <v-ons-list-item class="conte" ># {{todo.TourContent}}</v-ons-list-item>
                    <v-ons-list-item>
                        상태 : {{todo.TourState}}
                    </v-ons-list-item>
                    <v-ons-list-item>
                        <div class="time_check1" v-if="todo.TourState === 0">
                            여행객 모집 중!!!!!!!!!!!!!!!
                        </div>
                        <div class="time_check2" v-if="todo.TourState === 1">
                            여행객 모집 완료!!!!!!!!!!!!!!!
                        </div>
                        <div class="time_check3" v-if="todo.TourState === 2">
                            여행 끄으읕!!!!!!!!!!!!!
                        </div>
                    </v-ons-list-item>
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
            time_check(target, state, key){
                var time_register = this.$moment(key).format('YYYYMMDD');
                var time_present =  this.$moment(new Date()).format('YYYYMMDD');
                var temp = time_register - time_present;
                console.log(temp);
                if(target === 0){
                    return 0;
                }
                if(temp > 0 && temp <= 3 && state !== 1){
                        this.$http.post('http://localhost:8000/checkInfo/check/time', {
                            params: {
                                change_stat: 1,
                                target: target
                            }
                        })
                            .then((response) => {
                                    return 0;
                                },
                                (error) => { // error 를 보여줌
                                    alert(error.response.data.error)
                                }
                            )
                            .catch(error => {
                                alert(error);
                                return 0;
                            })
                        //state를 1로 바꿔줘야 해.
                        //업데이트 하는 백쪽 연결,
                }
                else if(temp <= 0 && state !== 2){
                        this.$http.post('http://localhost:8000/checkInfo/check/time', {
                            params: {
                                change_stat: 2,
                                target: target
                            }
                        })
                            .then((response) => {
                                    return 0;
                                },
                                (error) => { // error 를 보여줌
                                    alert(error.response.data.error)
                                }
                            )
                            .catch(error => {
                                alert(error);
                                return 0;
                            });
                }
                else{
                    return 0;
                }
            },
            // test_clear(){
            //
            //     return localStorage.clear();
            // },
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
                var reader = new FileReader();
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
                    console.log("imagesearch로부터 data받기 ")
                    console.log(data);
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
                    this.$ons.notification.alert({
                        message: "투어 상품이 없습니다",
                        title: "투어 상품 검색",
                    });

                }
                else {
                    this.$ons.notification.alert({
                        message: "투어 상품이 검색되었습니다",
                        title: "투어 상품 검색",
                    });
                }

            },//test_func()
            toggleList: function (type, className) {
                switch (type) {
                    case 'view':
                        this.viewType = className;
                        break;
                }
            }

        },

            data() {
                return {
                    test_time: this.$moment(new Date()).format('YYYYMMDD'),
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
        width: auto;
        }
    .button-margin{
        height: 35px;
        font-size: 14px;
        button-bar-color : #0076ff;
    }
    .select{
        height: 20px;
        width: auto;
    }
    .time_check1{
        display: block;
        width: 100%;
        height: 50px;
        margin: 20px 0 14px;
        padding-top: 1px;
        border: none;
        border-radius: 0;
        background-color: #01DF01;
        cursor: pointer;
        text-align: center;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        line-height: 61px;
        -webkit-appearance: none;
    }
    .time_check2{
        display: block;
        width: 100%;
        height: 50px;
        margin: 20px 0 14px;
        padding-top: 1px;
        border: none;
        border-radius: 0;
        background-color: #F79F81;
        cursor: pointer;
        text-align: center;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        line-height: 61px;
        -webkit-appearance: none;
    }
    .time_check3{
        display: block;
        width: 100%;
        height: 50px;
        margin: 20px 0 14px;
        padding-top: 1px;
        border: none;
        border-radius: 0;
        background-color: #2E64FE;
        cursor: pointer;
        text-align: center;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        line-height: 61px;
        -webkit-appearance: none;
    }

</style>