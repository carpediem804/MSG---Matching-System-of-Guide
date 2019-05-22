//const multer = require('multer');
const { Router } = require('express');
const router = Router();
//const Image = require('../db/models/Images');
const userinfo = require('../db/models/Userinfo');
const upload = require('../multer/storage');

router.post('/signup', function(req, res,next){
    //console.log(req);
    console.log("req.file");
    console.log(req.query.Name);
    var temp = 0;
    upload(req, res, function (err) {
        if(req.file == null || req.file == undefined || req.file == ""){
            //res.json('No Image Set');
            temp = 1;
            console.log("이미지없음")
        }

        let saveuser = new userinfo();
        if(temp === 0) {
            saveuser.User_ImageURL = req.file.filename;
        }
        saveuser.Email = req.query.Email;
        saveuser.Name = req.query.Name;
        saveuser.PWD =req.query.PWD;
        saveuser.PhoneNum =req.query.PhoneNum;
        saveuser.kakaoID = req.query.kakaoID;
        saveuser.Type = req.query.Type;
        saveuser.Auth = req.query.Auth;
        saveuser.GuideGrade = 0;
        saveuser.Total_Tour = 0;
        saveuser.Total_Review = 0;
        saveuser.save(function(err,data){
            if(err){
                console.log(err);
            }
            else {
                console.log("저장data "+data);
                res.send("된다");
            }
        });
    });
});
router.post('/fix',function(req,res,next){
    console.log("req.file");
    console.log(req.file);
    console.log(req.query.Name);
    var temp2 = 0;
    upload(req, res, function (err) {
        if(req.file == null || req.file == undefined || req.file == ""){
            //res.json('No Image Set');
            temp2 = 1;
            console.log("이미지없음")
        }
        userinfo.findOne({Email:req.query.useremail}).exec()
            .then(changeuser=>{
                if(temp2 === 0) {
                    changeuser.User_ImageURL = req.file.filename;
                }
                changeuser.Name = req.query.username;
                changeuser.PhoneNum = req.query.userphonenum;
                changeuser.kakaoID = req.query.userkakaoid;
                changeuser.save();
            });

        userinfo.findOne({Email:req.query.useremail}).exec()
            .then(user_info=>{
                console.log("바꾼 userinfo : "+user_info);
                res.json({user_info});
            })
    });
});
router.post('/login',function(req,res,next){
    console.log(req.body);
    userinfo.findOne({Email:req.body.email}).exec()
        .then(user_info=>{
            console.log("userinfo : "+user_info);
            res.json({user_info});
        })
});
router.post('/delete',function(req,res,next){
    console.log("삭제 시작합니다.");
    console.log(req.body.params);
    userinfo.findOneAndRemove({Email:req.body.params.user}).exec()
        .then(data=>{
            console.log("userinfo : "+ data);
            res.json({data});
        })
});

module.exports = router;