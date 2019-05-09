<template>
    <v-ons-page modifier="white">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div id="MakeTourItem">
            <v-ons-list>
                <v-ons-list-header>가이드 모집글</v-ons-list-header>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">

                    <div class="left">
                        제목
                    </div>
                    <label class="center">
                        <v-ons-input float maxlength="20"
                                     placeholder="Tour Title"
                                     autofocus="true"
                                     v-model="recruit.title"
                        >
                        </v-ons-input>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        장소
                    </div>
                    <label class="center">
                        <v-ons-input maxlength="20"
                                     placeholder="Tour Location"
                                     v-model="recruit.location"
                        >
                        </v-ons-input>
                    </label>
                </v-ons-list-item>


                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        희망 인원
                    </div>
                    <label class="center">
                        <v-ons-input maxlength="20"
                                     placeholder="MinNumber of People"
                                     v-model="recruit.number"
                        >
                        </v-ons-input>
                        명
                    </label>
                </v-ons-list-item>

                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        투어 시작일
                    </div>
                    <label class="center">
                        <v-ons-select style="width: 30%" v-model ="recruit.from_month">
                            <option disabled value="">월</option>
                            <option v-for="item in month"  :value="item.value" >
                                {{ item.text }}
                            </option>
                        </v-ons-select>
                        <pre>       </pre>
                        <v-ons-select style="width: 30%" v-model ="recruit.from_day">
                            <option disabled value="">일</option>
                            <option v-for="item in day"  :value="item.value" >
                                {{ item.text }}
                            </option>
                        </v-ons-select>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        투어 종료일
                    </div>
                    <label class="center">
                        <v-ons-select style="width: 30%" v-model ="recruit.to_month">
                            <option disabled value="">월</option>
                            <option v-for="item in month"  :value="item.value" >
                                {{ item.text }}
                            </option>
                        </v-ons-select>
                        <pre>       </pre>
                        <v-ons-select style="width: 30%" v-model ="recruit.to_day">
                            <option disabled value="">일</option>
                            <option v-for="item in day"  :value="item.value" >
                                {{ item.text }}
                            </option>
                        </v-ons-select>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        투어 내용
                    </div>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div>
                        <textarea name="content" v-model="recruit.content" cols="50" rows="15" placeholder="투어 내용을 입력하세요."></textarea>
                    </div>
                </v-ons-list-item>
                <p align="center">
                    <button class="register_button" @click="signUp()">작성하기</button>
                </p>
            </v-ons-list>
        </div>
        <!--<div id="SignUp">-->
            <!--<div class="register_title" align="center">-->
                <!--제목<input v-model="recruit.title" placeholder="제목을 입력하세요.">-->
            <!--</div>-->
            <!--<div class="register_location" align="center">-->
                <!--지역<input v-model="recruit.location" placeholder="지역을 입력하세요.">-->
            <!--</div>-->
            <!--<div class="register_location" align="center">-->
                <!--인원<input v-model="recruit.number" placeholder="지역을 입력하세요.">-->
            <!--</div>-->
            <!--<div class="register_from_date" align="center">-->
                <!--여행 시작날짜-->
                <!--<v-ons-select style="width: 120px" v-model ="recruit.from_month">-->
                    <!--<option disabled value="">월</option>-->
                    <!--<option v-for="item in month"  :value="item.value" >-->
                        <!--{{ item.text }}-->
                    <!--</option>-->
                <!--</v-ons-select>-->
                <!--<v-ons-select style="width: 120px" v-model ="recruit.from_day">-->
                    <!--<option disabled value="">일</option>-->
                    <!--<option v-for="item in day"  :value="item.value" >-->
                        <!--{{ item.text }}-->
                    <!--</option>-->
                <!--</v-ons-select>-->
            <!--</div>-->
            <!--<div class="register_from_date" align="center">-->
                <!--여행 종료날짜-->
                <!--<v-ons-select style="width: 120px" v-model ="recruit.to_month">-->
                    <!--<option disabled value="">월</option>-->
                    <!--<option v-for="item in month"  :value="item.value" >-->
                        <!--{{ item.text }}-->
                    <!--</option>-->
                <!--</v-ons-select>-->
                <!--<v-ons-select style="width: 120px" v-model ="recruit.to_day">-->
                    <!--<option disabled value="">일</option>-->
                    <!--<option v-for="item in day"  :value="item.value" >-->
                        <!--{{ item.text }}-->
                    <!--</option>-->
                <!--</v-ons-select>-->
            <!--</div>-->
            <!--<div class="register_content" align="center">-->
                <!--<br>내용<br>-->
                <!--<textarea name="content" v-model="recruit.content" cols="100" rows="20" placeholder="내용을 입력하세요.">-->
                <!--</textarea>-->
            <!--</div>-->
            <!--<p align="center">-->
                <!--<button class="register_button" @click="signUp()">작성하기</button>-->
            <!--</p>-->
        <!--</div>-->
    </v-ons-page>
</template>

<script>
    import axios from 'axios'
    export default {
        methods: {
            signUp(){

                axios.post('http://localhost:8000/recruit/custom',{
                    params: {
                        recruitdata: this.recruit

                    }
                }).then(function(data){
                    console.log("던졋다");
                    this.submitted = true;
                    console.log("submitted가 true 됨 ")

                });




                alert('제출되었습니다.');

                // var title=this.recruit.title;
                // var location=this.recruit.location;
                //
                // console.log(title);
                // console.log(location);
                //
                //
                // this.$store.commit('navigator/pop');

                location.reload();
            },


        },
        data() {
            return {
                recruit: {
                    id: localStorage.getItem('newEmail'),
                    title: '',
                    location: '',
                    number:'',
                    from_month: '',
                    from_day: '',
                    to_month: '',
                    to_day: '',
                    content: ''
                },
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

<style>
    .register_button{
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
    .register_form{
        background: #fff;
        display: block;
        margin: auto;
        padding: 5px 35px 10px 15px;
    }
</style>