<template>
  <v-ons-page>
    <div class="center" style="text-align: center;">
      <v-ons-list>
        <v-ons-list-item :modifier="md ? 'nodivider' : ''">
          <label class="center">
            &nbsp;&nbsp;&nbsp;&nbsp;                
              <v-ons-search-input maxlength="20"
                    placeholder="Search"
                    v-model="name"
              >
              </v-ons-search-input>
              <v-ons-button class="button-margin"  @click="test_func()">
                <ons-icon icon="fa-search"></ons-icon>
              </v-ons-button>
          </label>
        </v-ons-list-item>
      </v-ons-list>
      
      <v-ons-list>
        <v-ons-card v-for="item in filtered" @click="push(page2.component, page2.label, item)">
          <!--<img src="../assets/background4.jpg" alt="Image File" style="width:310px; height:auto">-->
          <div class="update_time" v-if="time_check(item.RecruitNum,item.Apply_state,item.From_time) === 0">
          </div>
          <div class="title2">
            {{item.RecruitTitle}}
          </div>
          <div class="test2" align="right">{{item.RecruitPeopleNumber}}명</div>
          <div class="content2">
            <v-ons-list>
              <v-ons-list-item ># {{item.RecruitLocation}} </v-ons-list-item>
              <v-ons-list-item ># {{time_set(item.From_time.toString().substring(0,19))}}<br> ~ {{time_set(item.To_time.toString().substring(0,19))}}</v-ons-list-item>
            </v-ons-list>
          </div>
          <div class="content3" align="center" v-if="item.Apply_state === 0">
            모집중...
          </div>
          <div class="content4" align="center" v-if="item.Apply_state === 1">
            모집완료
          </div>
          <div class="content5" align="center" v-if="item.Apply_state === 2">
            기간지남...
          </div>
        </v-ons-card>
      </v-ons-list>
    </div>
    <br>
    <br>
    <P align="center">
      <button class="button_apply" v-if="session_existed()" @click="push(page1.component, page1.label)">가이드 모집하기</button>
    </p>

  </v-ons-page>
</template>

<script>

  import GuideApply from './GuideRecruit.vue'
  import GuideRecruit from './MakeRecruitGuide.vue'
  import axios from 'axios'

  import Vue from 'vue'

  export default {

    beforeCreate(){
      this.$http.get('http://13.125.164.72:8000/recruit/custom').then(data => {
        this.total_data=data.data.recruitdata;
        this.filtered_data.pop();
        for (var i = 0; i < this.total_data.length; i++) {
          this.filtered_data.push(this.total_data[i]);
          this.filtered.push(this.total_data[i])
          this.listitems.push(this.total_data[i])
        }

      });
    },

    data() {
      return {
        test_time: this.$moment(new Date()).format('YYYYMMDD'),
        filtered: [],

        temp :[],
        total_data: [
            {
                ApplyRecruitID: "테스트",
                From_time: "2019-05-08T13:47:49.925Z",
                RecruitContent: " 수원수원",
                RecruitLocation: "수원",
                RecruitNum: 0,
                RecruitPeopleNumber: 3,
                RecruitTitle: "수원",
                To_time: " 2019-05-08T13:47:49.925Z",
                UserID: " swp0514@ajou.ac.kr",
                WriteTime: "2019-05-08T13:47:49.925Z ",


            }
        ],
        filtered_data: [
          {
            ApplyRecruitID: "테스트",
            From_time: "2019-05-08T13:47:49.925Z",
            RecruitContent: " 수원수원",
            RecruitLocation: "수원",
            RecruitNum: 0,
            RecruitPeopleNumber: 3,
            RecruitTitle: "수원",
            To_time: " 2019-05-08T13:47:49.925Z",
            UserID: " swp0514@ajou.ac.kr",
            WriteTime: "2019-05-08T13:47:49.925Z ",
          }
        ],
          send_data: '',

        page1: {
          component: GuideRecruit,
          label: '가이드 모집글'
        },

        page2: {
          component: GuideApply,
          label: '가이드 모집글'
        },

        items: [
          { text: 'Vue', value: 'Vue' },
          { text: 'React', value: 'React' },
          { text: 'Angular', value: 'Angular' }
        ],

        name: '',

        localitems: [
          { value: '1', text: '1' },
          { value: '2', text: '2' },
          { value: '3', text: '3' },
          { value: '4', text: '4' },
          { value: '5', text: '5' },
          { value: '6', text: '6' }
        ],

        selectedLocal: '',

        listitems: [],

        todos:[],


        state: 'initial',

        ratio: 0,

          Passed:[],


      };
    },
    methods: {
      time_set(key){
        var time_set = this.$moment(key).format('YYYY-MM-DD h:mm a');
        return time_set;
      },
      time_check(target, state, key){
        var time_register = this.$moment(key).format('YYYYMMDD');
        var time_present =  this.$moment(new Date()).format('YYYYMMDD');
        var temp = time_register - time_present;
        console.log(temp);
        if(target === 0){
          return 0;
        }
        if(temp <= 0 && state !== 2){
          this.$http.post('http://13.125.164.72:8000/recruit/check/time', {
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
      session_existed() {
        if (localStorage.getItem('newType') === '여행객') {
          return true;
        }
        return false;
      },

          test_func(){
              console.log(this.filtered.length);

              while(this.filtered.length !== 0){
                  this.filtered.pop();
              }
              for(var i=0; i<this.listitems.length; i++){
                  if(this.listitems[i].RecruitTitle.includes(this.name)){
                      this.filtered.push(this.listitems[i])
                  }
              }
            if(this.filtered.length == 0){
              this.$ons.notification.alert({
                message: "가이드 모집글이 없습니다",
                title: "가이드 모집글 검색",
              });

            }
            else {
              this.$ons.notification.alert({
                message: "가이드 모집글이 검색되었습니다",
                title: "가이드 모집글 검색",
              });
            }
          },


          alert2 () {
              alert(this.name)
          },

          alert3 (kitten) {
              this.kitten=kitten
              alert(this.kitten+" 를 선택하셨습니다.")
          },

          filter(){

              var isfiltered = false;
              var todoObj = {};

              for(var i=0;this.listitems.length;i++){
                  if (listitems[i].includes(name)){
                      this.todos.push(listitems[i])
                  }
              }

              this.listitems=this.todos;
              console.log(this.listitems)

          },

          push(page, key, item) {


              this.$store.state.item=item;
              console.log(this.$store.state.item);
              // this.Passed=RecruitNum
              // console.log(RecruitNum)
              // Eventbus.$emit("use-eventbus", RecruitNum);
              // console.log("나는 문제가 없어")


              this.$store.commit('navigator/push', {
                  extends: page,
                  data() {
                      return {
                          toolbarInfo: {
                              backLabel: 'Home',
                              title: key
                          },
                      }
                  }
              });

              console.log("나는 문제가 없어2")
          }


      },
  };
</script>









<style>
  .carousel-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
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


  .button_apply{
    display: block;
    top: auto;
    bottom: auto;
    right: auto;
    min-width: 69px;
    height: 43px;
    background: #00c73c;
    border: 1px solid rgba(0,0,0,0.1);
    font-size: 15px;
    line-height: 100%;
    font-weight: bold;
    text-align: center;
    color: #fff;
    z-index: 10;
  }

  .content3{
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
  .content4{
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
  .content5{
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
  .dots > span {
    cursor: pointer;
  }
</style>
