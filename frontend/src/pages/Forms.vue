<template>
  <v-ons-page>
    <div class="SearchEngine" align="center">
      <v-ons-select style="width: 120px" v-model ="from_month">
        <option disabled value="">월</option>
        <option v-for="item in month"  :value="item.value" >
          {{ item.text }}
        </option>
      </v-ons-select>
      <v-ons-select style="width: 120px" v-model ="from_day">
        <option disabled value="">일</option>
        <option v-for="item in day"  :value="item.value" >
          {{ item.text }}
        </option>
      </v-ons-select>
      부터
      <v-ons-select style="width: 120px" v-model ="to_month">
        <option disabled value="">월</option>
        <option v-for="item in month"  :value="item.value" >
          {{ item.text }}
        </option>
      </v-ons-select>
      <v-ons-select style="width: 120px" v-model ="to_day">
        <option disabled value="">일</option>
        <option v-for="item in day"  :value="item.value" >
          {{ item.text }}
        </option>
      </v-ons-select>
      까지
      <v-ons-select style="width: 120px" v-model ="location">
        <option disabled value="">카테고리</option>
        <option v-for="item in location_list"  :value="item.value" >
          {{ item.text }}
        </option>
      </v-ons-select>
      <v-ons-input float maxlength="100"
                   placeholder="Keywords"
                   v-model="SearchString"
      >
      </v-ons-input>
      <v-ons-button style="text-align: center"
                    @click=test_func()>검색
      </v-ons-button>
    </div>
    <br>
    <p align="right">
      <v-ons-button class="assign_button" v-if="!session_exist()"
                    @click="push(page.component, page.label)">작성하기
      </v-ons-button>
    </p>
    <div class="test1" v-for="item in Total_data" >
      {{item.location}} : {{item.text}}
    </div>
    {{'---------------------------------------------------'}}
    <br>
    <div id="todo-list-example">
      <ul>
        <li v-for="todo in filtered">
          {{todo.location}} : {{todo.text}}
        </li>
      </ul>
    </div>
  </v-ons-page>
</template>

<script>
  import Menu_test2 from "./Menu_test2.vue";
  export default {
    methods: {
      session_exist(){
        if(localStorage.getItem('newUser')==null){
          return true;
        }
        return false;
      },
      test_func(){
        console.log(this.filtered.length);
        while(this.filtered.length !== 0){
          this.filtered.pop();
        }
        for(var i=0; i<this.Total_data.length; i++){
          if(this.Total_data[i].location === this.SearchString){
            this.filtered.push({
              location : this.Total_data[i].location,
              text : this.Total_data[i].text
            })
          }
        }
        alert("보냈다!");
      },
      push(page, key) {
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
      }
    },
    data() {
      return {
        filtered: [
          {
            location: '검색 결과',
            text: '없음',
          }
        ],
        nextId : 1,
        Total_data:  [
          {location: '서울', text:'광화문'},
          {location: '서울', text:'청계천'},
          {location: '부산', text:'해운대'},
          {location: '부산', text:'서면'}
        ],
        page: {
          component: Menu_test2,
          label: '가입글 등록'
        },
        SearchString: '',
        location : '',
        location_list : [
          {value: '1', text: '지역'},
          {value: '2', text: '제목'},
        ],
        month: [
          { value: '1월', text: '1월' },
          { value: '2월', text: '2월' },
          { value: '3월', text: '3월' },
          { value: '4월', text: '4월' },
          { value: '5월', text: '5월' },
          { value: '6월', text: '6월' },
          { value: '7월', text: '7월' },
          { value: '8월', text: '8월' },
          { value: '9월', text: '9월' },
          { value: '10월', text: '10월' },
          { value: '11월', text: '11월' },
          { value: '12월', text: '12월' },
        ],
        day: [
          { value: '1일', text: '1일' },
          { value: '2일', text: '2일' },
          { value: '3일', text: '3일' },
          { value: '4일', text: '4일' },
          { value: '5일', text: '5일' },
          { value: '6일', text: '6일' },
          { value: '7일', text: '7일' },
          { value: '8일', text: '8일' },
          { value: '9일', text: '9일' },
          { value: '10일', text: '10일' },
          { value: '11일', text: '11일' },
          { value: '12일', text: '12일' },
          { value: '13일', text: '13일' },
          { value: '14일', text: '14일' },
          { value: '15일', text: '15일' },
          { value: '16일', text: '16일' },
          { value: '17일', text: '17일' },
          { value: '18일', text: '18일' },
          { value: '19일', text: '19일' },
          { value: '20일', text: '20일' },
          { value: '21일', text: '21일' },
          { value: '22일', text: '22일' },
          { value: '23일', text: '23일' },
          { value: '24일', text: '24일' },
          { value: '25일', text: '25일' },
          { value: '26일', text: '26일' },
          { value: '27일', text: '27일' },
          { value: '28일', text: '28일' },
          { value: '29일', text: '29일' },
          { value: '30일', text: '30일' },
          { value: '31일', text: '31일' }
        ],
        from_month: '',
        from_day : '',
        to_month :'',
        to_day:''
      };
    }
  };
</script>
<style scoped>
  .assign_button{
    width: 150px;
    height: 61px;
    padding-top: 1px;
    border: none;
    border-radius: 0;
    background-color: #A9BCF5;
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