<template>
<v-ons-page>
    <div class="test2" align="center">
        <v-ons-list>
            <v-ons-list-item :modifier="md ? 'nodivider' : ''">

                <div class="center">
                    <v-ons-list-item> <v-ons-input type="date" v-model="startDate"> </v-ons-input> </v-ons-list-item>
                &nbsp;&nbsp;<div><v-ons-input maxlength="20"
                    placeholder="Search"
                    v-model="search"></v-ons-input>&nbsp;&nbsp;
                <v-ons-button class="button-margin"  @click="toursearch()" >
                    <ons-icon icon="fa-search"></ons-icon>
                </v-ons-button>&nbsp;
                <v-ons-button class="button-margin" @click="imagesearch()" >
                    <ons-icon icon="camera" size="15px" style="color: white"></ons-icon>
                </v-ons-button>&nbsp;</div>
            </div>
            </v-ons-list-item>
            <p align="right">
                <v-ons-button class="button-margin" v-if="session_existed()" icon='ion-edit'
                    @click="push(page.component, page.label)"> 투어상품 등록
                </v-ons-button>
            </p>
            <!--//보기 정렬-->
            <div class="button-group">
                <div class="buttons" align="center">
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
            &nbsp;
        </v-ons-list>
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
    <v-ons-list>

        <v-ons-list v-if="viewType ==='list'">
            <v-ons-card v-for="todo in filtered" @click="push(page2.component, page2.label, todo)"  >
                <div class="update_time" v-if="time_check(todo.TourNum,todo.TourState,todo.TourDayandTime_start,todo.UserID) === 0">
                </div>
                <div class="title">
                    <strong>  {{todo.TourTitle}} </strong><br>
                </div>
                # {{todo.TourNowPeopleNum}}명 / {{todo.TourMaxNum}}명
                &nbsp;# {{todo.TourPrice}}원 <br>
                # {{todo.TourLocation}}    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # {{todo.TourThema}}
                <br>
                # {{time_set(todo.TourDayandTime_start)}} ~ {{time_set(todo.TourDayandTime_end)}}

            </v-ons-card>
        </v-ons-list>

        <v-ons-list v-else>
            <v-ons-card v-for="todo in filtered" @click="push(page2.component, page2.label, todo)"  >
                <div class="update_time" v-if="time_check(todo.TourNum,todo.TourState,todo.TourDayandTime_start,todo.UserID) === 0">
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
                        <v-ons-list-item> # {{time_set(todo.TourDayandTime_start)}}<br> ~ {{time_set(todo.TourDayandTime_end)}}</v-ons-list-item>
                        <v-ons-list-item ># {{todo.TourLocation}}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # {{todo.TourThema}} </v-ons-list-item>
                        <v-ons-list-item class="conte" ># {{todo.TourContent}}</v-ons-list-item>
                        <v-ons-list-item>
                            <div class="time_check1" v-if="todo.TourState === 0">
                                여행객 모집 중!
                            </div>
                            <div class="time_check2" v-if="todo.TourState === 1">
                                여행객 모집 완료!
                            </div>
                            <div class="time_check3" v-if="todo.TourState === 2">
                                여행 투어 완료!
                            </div>
                        </v-ons-list-item>
                    </v-ons-list>
                </div>
            </v-ons-card>
        </v-ons-list>
    </v-ons-list>
</v-ons-page>
</template>

<script>

    import MakeTourItem from "./MakeTourItem.vue";
    import TourInfo from "./TourInfo.vue";
    import axios from 'axios'

    export default {
        methods: {

            time_set(key){
                var time_set = this.$moment(key).format('YYYY-MM-DD h:mm a');
                return time_set;
            },
            time_set2(key){
                var time_set = this.$moment(key).format('YYYYMMDD');
                return time_set;
            },

            time_check(target, state, key, user){
                // console.log(user);
                var time_register = this.$moment(key).format('YYYYMMDD');
                var time_present =  this.$moment(new Date()).format('YYYYMMDD');
                var temp = time_register - time_present;
                // console.log(temp);
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
                                    return 0;
                                }
                            )
                            .catch(error => {
                                alert(error);
                                return 0;
                            });
                }
                else if(temp <= 0 && state !== 2){
                        this.$http.post('http://localhost:8000/checkInfo/check/time', {
                            params: {
                                change_stat: 2,
                                target: target
                            }
                        })
                            .then((response) => {
                                    this.$http.post('http://localhost:8000/checkInfo/guide/addtour', {
                                        params: {
                                            user_id: user,
                                        }
                                    })
                                        .then((res) => {
                                                return 0;
                                            },
                                            (error) => {
                                                alert(error.response.data.error)
                                                return 0;
                                            })
                                        .catch(error => {
                                            alert(error);
                                            return 0;
                                        });
                                },
                                (error) => { // error 를 보여줌
                                    alert(error.response.data.error)
                                    return 0;
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
                let self =this;
                axios.post('http://localhost:8000/imagesearch',formData,{
                    params: {
                    }
                }).then(function(data2){
                    console.log("register TourItem complete");
                    console.log("imagesearch로부터 data받기 ")
                    console.log(data2);
                    console.log(data2.data);
                    console.log(data2.data[0].description);
                    console.log('landmakrs : ');
                   
                   self.Landmarks2 = data2.data[0].description;
                    console.log(self.Landmarks2);
                    return(self.Landmarks2);


                }).then(function(){
                    console.log('이미지검색 시작~');
                    console.log(self.Landmarks2);
                    self.imagesearch2(self.Landmarks2);

                })
                {
                    this.removeImage();
                    this.modalVisible = false;

                }// axios
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
            imagesearch2(search) {
                console.log(this.categories.length);
                while (this.filtered.length !== 0) {
                    this.filtered.pop();
                }
                console.log(this.filtered.length)
                console.log(this.categories.length);
                for (var i = 0; i < this.categories.length; i++) {
                    if(this.categories[i].TourContent.includes(search) || this.categories[i].TourTitle.includes(search) || this.categories[i].TourImageiswhat === search){
                        this.filtered.push(this.categories[i]);
                    }
                } //검색엔진
                console.log(this.filtered);
                if(this.filtered.length == 0){
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

            },//imageseach()
            session_existed() {
                if (localStorage.getItem('newType') === '가이드') {
                    return true;
                }
                return false;
            },
            toursearch() {
                console.log(this.categories.length);
                while (this.filtered.length !== 0) {
                    this.filtered.pop();
                }
                console.log(this.filtered.length)
                console.log(this.categories.length);
                console.log("날짜날짜:");
                console.log(this.startDate);
                for (var i = 0; i < this.categories.length; i++) {

                    if(this.startDate)
                    {
                        if ( (this.categories[i].TourTitle.includes(this.search) || this.categories[i].TourContent.includes(this.search)
                            || this.categories[i].TourLocation === (this.search) || this.categories[i].TourThema === (this.search))
                            && this.time_set2(this.startDate) === this.time_set2(this.categories[i].TourDayandTime_start) )
                        {
                            this.filtered.push(this.categories[i]);
                        }
                    }
                    else {
                        if (this.categories[i].TourTitle.includes(this.search) || this.categories[i].TourContent.includes(this.search) || this.categories[i].TourLocation === (this.search) || this.categories[i].TourThema === (this.search)) {
                            this.filtered.push(this.categories[i]);
                        }
                    }


                } //검색엔진
                console.log(this.filtered);
                if(this.filtered.length == 0){
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

            },//toursearch()
            computed:{

            },
            toggleList: function (type, className) {
                function time_set2(key) {
                        const time_set = key.substring(0,4)+ key.substring(5,7) + key.substring(8,10);
                        return time_set;
                }
                function price_set(key) {
                    const price_set = key.toString();
                    return price_set;
                }

                switch (type) {
                    case 'view':
                        this.viewType = className;
                        break;
                    case 'sort':
                        this.sortType = className;

                        if(className === 'sort-numeric-up')
                        {   console.log('원래 ');
                            console.log(this.filtered);
                            this.filtered.sort( (a, b)=> {return time_set2(a.TourDayandTime_start)- time_set2(b.TourDayandTime_start) });
                            console.log("시간");
                            console.log("변경 ");
                            console.log(this.filtered);
                        }
                       else if(className === 'star')
                        {
                            console.log('원래 ');
                            console.log(this.filtered);
                            this.filtered.sort((a, b)=>{return price_set(a.TourPrice) - price_set(b.TourPrice)});
                            console.log("가격");
                            console.log("변경 ");
                            console.log(this.filtered);
                        }
                        break;

                }
            }

        },

            data() {
                return {
                    startDate:'',
                    Landmarks2: '',
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
                            TourContent: "testcontent",
                            TourDayandTime_start: "testDay",
                            TourDayandTime_end: "testDay",
                            TourImageURL: "http://localhost:8000/",
                            TourLocation: "testLo",
                            TourThema: 'testThe',
                            TourMaxNum: 10,
                            TourMinNum: 5,
                            TourNowPeopleNum: 0,
                            TourNum: 0,
                            TourPrice: 150000,
                            TourTitle: "title",
                            Tour_create_date: "2019-05-06T07:10:20.163Z",
                            UserID: "kki",
                            TourImageiswhat :"없음"

                        }
                    ],
                    categories: [
                        {
                            TourContent: "content",
                            TourDayandTime_start: "2019-05-06T07:10:20.163Z",
                            TourDayandTime_end: "2019-05-06T07:10:20.163Z",
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
                            TourImageiswhat : "없음"
                        }
                    ],

                    search: '',
                    spdOpen: false,
                    viewType:'th-large',
                    sortType:'sort-numeric-up',
                    sort_star: false,
                    sort_day: false,
                    buttons:{
                        'view':[
                            {'class': 'list', 'title':'view in list', selected:false},
                            {'class': 'th-large', 'title':'view in thumbnail', selected:true}
                        ],
                        'sort':[
                            {'class': 'sort-numeric-up', 'title':'sort by deadline '},
                            {'class': 'star', 'title':'sort by stars'},
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
                        //this.filtered[i].TourDayandTime_start

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

        white-space: nowrap;
        width: auto;
        border: 1px solid #000000;
        overflow: hidden;
        text-overflow: ellipsis;

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
        background-color: #f7ab54;
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
        background-color: #fe111b;
        cursor: pointer;
        text-align: center;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        line-height: 61px;
        -webkit-appearance: none;
    }

</style>