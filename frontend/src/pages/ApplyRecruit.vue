<template>
    <v-ons-page modifier="white">
        <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
        <div id="MakeGuideApply">
            <v-ons-list>
                <v-ons-list-header>가이드 신청</v-ons-list-header>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        투어 가격
                    </div>
                    <label class="center">
                        <v-ons-input maxlength="20"
                                     placeholder="Tour Price"
                                     v-model="recruit.price">
                        </v-ons-input>
                        원
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="left">
                        투어 내용
                    </div>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div>
                        <textarea name="content" v-model="recruit.content" cols="52" rows="19" placeholder="투어 내용을 입력하세요."></textarea>
                    </div>
                </v-ons-list-item>
                <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 text-center app">
                        <img class="profile-image" :src="userImage" width="275" height="230"/>
                        <div v-if="!userImage">
                            <input type="file" round class="change-profile-image" @change="onFileChange" />
                        </div>
                        <div v-else>
                            <button class="delete-profile-image" color="secondary" icon="delete" @click="removeImage">Delete</button>
                        </div>
                    </div>
                </v-ons-list-item>
                <p align="center">
                    <button class="register_button" @click="ApplyGuide()">작성하기</button>
                </p>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
    import axios from 'axios'

    export default {
            methods: {

                Alarm(id, title, comment){
                    this.$http.post('http://localhost:8000/checkinfo/alarm', {
                        params: {
                            target: id,
                            comment: comment,
                            title: title
                        }
                    })
                        .then((response) => {  //로그인 성공;
                                console.log(response);
                            },
                            (error) => { // error 를 보여줌
                                console.log(error);
                            }
                        )
                        .catch(error => {
                            alert(error)
                        })
                },

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

            ApplyGuide() {
                axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
                let formData = new FormData();
                formData.append('file',this.selectedFile);
                axios.post('http://localhost:8000/recruit/apply',formData, {
                params: {
                    target : this.recruit.target,
                    id : this.recruit.id,
                    price: this.recruit.price,
                    content: this.recruit.content,
                }
                }).then(function (data) {
                    console.log("Apply Guide complete");
                });
                this.$ons.notification.alert({
                    message: "가이드 신청 되었습니다.",
                    title: "가이드 신청 성공",
                    callback: function (index) {
                        this._self.Alarm(this._self.userid, "가이드 게시글에 대한 지원",this._self.recruit.content);
                        location.reload();
                    },
                })
                // location.reload();
            }
        },

        data() {
            return {
                userImage: '',
                recruit: {
                    target : this.$store.state.item.RecruitNum,
                    id : localStorage.getItem('newEmail'),
                    price:'',
                    content: '',
                }
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
    .register_name{
        background: #fff;
        display: block;
        margin: auto;
        padding: 5px 35px 10px 15px;
    }
    .register_id{
        background: #fff;
        display: block;
        margin: auto;
        padding: 5px 35px 10px 15px;
    }
    .register_pw{
        background: #fff;
        display: block;
        margin: auto;
        padding: 5px 35px 10px 15px;
    }
    .register_type{
        background: #fff;
        display: block;
        margin: auto;
        padding: 5px 35px 10px 15px;
    }
</style>
