<template>
  <v-ons-page>

    <div class="center" style="text-align: center;">

      <label class="center"  >
        <p>

        <form class='s-form'>
          <v-ons-input float maxlength="100"
                       placeholder="Keywords"
                       v-model="name"
          >
          </v-ons-input>

          <v-ons-button style="text-align: center"
                        @click="test_func()">찾기
          </v-ons-button>

        </form>


        <v-ons-select style="width: 120px" v-model ="selectedLocal " >

          <option v-for="item in localitems"  :value="item.value" >
            {{ item.text }}
          </option>

        </v-ons-select>

        <v-ons-select style="width: 120px" v-model ="selectedLocal " >

          <option v-for="item in localitems"  :value="item.value" >
            {{ item.text }}
          </option>

        </v-ons-select>

        <!--<div class="center">-->
          <!--{{ selectedLocal }} is awesome!-->
        <!--</div>-->

        <!--<p>{{ name }}</p>-->





      </label>

      <!--<v-ons-list>-->
        <!--<v-ons-list-header>검색 결과</v-ons-list-header>-->

        <!--<v-ons-list-item v-for="item in listitems" :key="item"-->
                         <!--@click="push(page2.component, page2.label)">-->
          <!--<div class="center" >{{ item }}</div>-->
        <!--</v-ons-list-item>-->

      <!--</v-ons-list>-->



      <v-ons-list>
        <v-ons-list-header>필터링</v-ons-list-header>

        <v-ons-list-item v-for="item in filtered" :key="item"
                         @click="push(page2.component, page2.label)" >
          <div class="center" >{{ item }}</div>
        </v-ons-list-item>

      </v-ons-list>


    </div>

    <P align="center">
      <button class="button_apply" @click="push(page1.component, page1.label)">가이드 모집하기</button>
    </p>



      <!--<P align="center">-->
          <!--<button class="button_apply" @click="beforeCreate()">데이터확인!</button>-->
      <!--</p>-->

    <br>
    <br>


<!--내가 만든 리스트형-->

      <v-ons-list>
          <v-ons-list-header>데이터</v-ons-list-header>

          <v-ons-list-item v-for="item in total_data"
                           @click="push(page2.component, page2.label, item) ">
              <div class="center" >{{ item.RecruitTitle }}</div>
          </v-ons-list-item>

      </v-ons-list>

      <!--transmit(item.RecruitNum)-->




    <!--기훈이가 만든 카드 형-->

  <v-ons-list-item>
    <v-ons-card v-for="todo in filtered_data">
      <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" style="width: 100%">
      <div class="title2">
        {{todo.RecruitTitle}}
      </div>
      <div class="test2" align="right">{{todo.RecruitPeopleNumber}}명</div>
      <div class="content2">
        <!--<div>-->
          <!--<v-ons-button ><v-ons-icon icon="ion-thumbsup"></v-ons-icon></v-ons-button>-->
          <!--<v-ons-button ><v-ons-icon icon="ion-share"></v-ons-icon></v-ons-button>-->
        <!--</div>-->
        <v-ons-list>
          <v-ons-list-item ># {{todo.RecruitLocation}} </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
  </v-ons-list-item>
  </v-ons-page>
</template>

<script>

  import GuideApply from './RecruitGuide.vue'
  import GuideRecruit from './KH.vue'
  import axios from 'axios'

  import Vue from 'vue'

  export default {
    beforeCreate(){
      this.$http.get('http://localhost:8000/recruit/custom').then(data => {
        this.total_data=data.data.recruitdata;
        this.filtered_data.pop();
        for (var i = 0; i < this.total_data.length; i++) {
          this.filtered_data.push(this.total_data[i]);
        }
      });
    },
    data() {
      return {

        filtered: ['제주 제주', '제주 서귀포', '제주 우도', '서울 남대문',
          '서울 서대문', '서울 경복궁', '경기 수원시', '경기 성남시',
          '경기 화성시', '경기 오산시', '경기 광주시'
        ],
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

        listitems: [
          '제주 제주', '제주 서귀포', '제주 우도', '서울 남대문',
          '서울 서대문', '서울 경복궁', '경기 수원시', '경기 성남시',
          '경기 화성시', '경기 오산시', '경기 광주시'

        ],

        todos:[],


        state: 'initial',

        ratio: 0,

          Passed:[],


      };
    },
    methods: {

          test_func(){
              console.log(this.filtered.length);
              while(this.filtered.length !== 0){
                  this.filtered.pop();
              }
              for(var i=0; i<this.listitems.length; i++){
                  if(this.listitems[i].includes(this.name)){
                      this.filtered.push(this.listitems[i])
                  }
              }
              alert("보냈다!");
          },

        // transmit(RecruitNum){
        //     this.RecruitNum=RecruitNum
        //     console.log(RecruitNum)
        //
        //     Eventbus.$emit("use-eventbus", this.RecruitNum);
        // },

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

              this.listitems=this.todos
              console.log(this.listitems)

          },

          push(page, key, item) {

              this.$store.state.item=item
              console.log(this.$store.state.item)
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
                          }
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
    font-size: 30px;
    color: #fff;
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
  }

  .dots > span {
    cursor: pointer;
  }
</style>
