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



      </label>


      <v-ons-list>
        <v-ons-card v-for="item in filtered" @click="push(page2.component, page2.label, item)">
          <!--<img src="../assets/background4.jpg" alt="Image File" style="width:310px; height:auto">-->
          <div class="title2">
            {{item.RecruitTitle}}
          </div>
          <div class="test2" align="right">{{item.RecruitPeopleNumber}}명</div>
          <div class="content2">
            <v-ons-list>
              <v-ons-list-item ># {{item.RecruitLocation}} </v-ons-list-item>
            </v-ons-list>
          </div>
        </v-ons-card>
      </v-ons-list>


    </div>


    <br>
    <br>



    <P align="center">
      <button class="button_apply" @click="push(page1.component, page1.label)">가이드 모집하기</button>
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
      this.$http.get('http://localhost:8000/recruit/custom').then(data => {
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
              // alert("보냈다!");
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
