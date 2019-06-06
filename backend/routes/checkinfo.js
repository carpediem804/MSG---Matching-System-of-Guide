const { Router } = require('express');
const router = Router();

const Tourinfo = require('../db/models/Tour');
const applyguide = require('../db/models/GuideRecruit');
const guideinfo = require('../db/models/ApplyRecruit');
const applyrecruit = require('../db/models/ApplyRecruit');
const userinfo = require('../db/models/Userinfo');
const Guide_Auth_info = require('../db/models/Guide_Auth');

router.post('/register', function(req, res,next){
    console.log("checkinfo/register로 들어옴");
    //console.log(req.body);
    console.log(req.body.params);
    if(req.body.params.type === "여행객") {
        console.log("여행객");
        applyguide.find({UserID: req.body.params.email},function(err,applyguidedata){
            if(err) {
                console.log(err);
            }else{
               console.log(applyguidedata);
                res.json({applyguidedata});
            }
        })
    }
    else if(req.body.params.type === "가이드"){
        console.log("가이드");
        Tourinfo.find({UserID: req.body.params.email},function(err,Tourdata){
            if(err) {
                console.log(err);
            }else{
                console.log(Tourdata);
                res.json({Tourdata});
            }
        })
    }
});
router.post('/apply', function(req, res,next){
    console.log("checkinfo/apply로 들어옴");
    console.log(req.body.params);
    if(req.body.params.type === "여행객") {
        console.log("여행객");
        Tourinfo.find({TourApplyList2:{$elemMatch:{user_apply_id:req.body.params.email}}},function (err,data){
            if(err){
                console.log(err);
            }else{
                console.log(data);
                res.json({data});
            }
        })
    }
    else if(req.body.params.type === "가이드"){
        console.log("가이드");
        applyguide.find({ApplyGuideID: req.body.params.email},function (err,data){
            if(err){
                console.log(err);
            }else{
                console.log(data);
                res.json({data});
            }
        })
    }
});
router.post('/delete', function(req, res,next) {
    console.log("delete로 들어옴")
    console.log(req.body.params);
    if(req.body.params.type=='여행객') {
        applyguide.findOneAndRemove({RecruitNum:req.body.params.item.RecruitNum},function(err,data){
            if(err){
                console.log(err);
            }
            res.send("삭제완료");
        })
    }
    else{
        Tourinfo.findOneAndRemove({TourNum:req.body.params.item.TourNum},function (err,data) {
            if(err){
                console.log(err);
            }
            res.send("삭제완료");
        })
    }
});
router.post('/delete2', function(req, res,next) {
    console.log("delete2로 들어옴")
    console.log(req.body.params);
    console.log(req.body.params.type);
    if(req.body.params.type=='여행객') {
        console.log("여행객임.");
        applyguide.findOneAndRemove({UserID:req.body.params.user},function(err,data){
            if(err){
                console.log(err);
            }
            res.send("삭제완료");
        })
    }
    else{
        console.log("가이드임.");
        Tourinfo.findOneAndRemove({UserID:req.body.params.user},function (err,data) {
            if(err){
                console.log(err);
            }
            res.send("삭제완료");
        })
    }
});
router.post('/apply/delete', function(req, res,next) {
    console.log("apply/delete로 들어옴")
    if(req.body.params.type=='여행객') {
        const peoplenum  = req.body.params.item.TourNowPeopleNum - (req.body.params.People_num*1);
        Tourinfo.findOneAndUpdate({TourNum:req.body.params.item.TourNum},{$pull:{TourApplyList2:{user_apply_id: req.body.params.email}},$set:{TourNowPeopleNum: peoplenum} },function(err,data){
            if(err){
                console.log(err);
            }
                console.log(data);
                res.send("삭제완료");
        })
    }
    else{
        applyguide.findOneAndUpdate({RecruitNum:req.body.params.item.RecruitNum},{$pull:{ApplyGuideID:req.body.params.email}},function (err,data) {
            if(err){
                console.log(err);
            }
            applyrecruit.findOneAndRemove({RecruitApplier:req.body.params.email, apply_post_num:req.body.params.item.RecruitNum},function(err,data){
                if(err){
                    console.log(err);
                }
                console.log(data);
                res.send("삭제완료");
            })
        })
    }
});
router.post('/show', function(req, res,next) { //자신이 등록한 게시글에 신청한 사람정보 찾아서 보내기
    console.log(req.body.params);
    if(req.body.params.type == '여행객') {
        //가이드 정보 던지는거
        guideinfo.find({apply_post_num : req.body.params.target,RecruitApplier:req.body.params.user},function(err,data){
            if(err){
                console.log(err);
            }
            else {
                console.log("찾아서 보내는 data : "+data);
                res.json({data});
            }
        })
    }
    else if (req.body.params.type == '가이드'){
        //여행자 정보 던지는거

    }
});
router.post('/show2', function(req, res,next) { //자신이 등록한 게시글에 신청한 사람정보 찾아서 보내기
    console.log(req.body.params);
    if(req.body.params.type == '가이드') {
        //가이드 정보 던지는거
        guideinfo.find({apply_post_num : req.body.params.target,RecruitApplier:req.body.params.user},function(err,data){
            if(err){
                console.log(err);
            }
            else {
                console.log("찾아서 보내는 data : "+data);
                res.json({data});
            }
        })
    }
    else if (req.body.params.type == '여행객'){
        //여행자 정보 던지는거

    }
});
router.post('/guide', function(req, res,next) { //자신이 등록한 게시글에 신청한 사람정보 찾아서 보내기
    console.log(req.body.params);
    userinfo.find({Email: req.body.params.user},function(err,data){
        if(err){
            console.log(err);
        }
        else {
            console.log("찾아서 보내는 data : "+data);
            res.json({data});
        }
    })
});
router.post('/guideAuth/make', function(req, res,next) { //가이드 등록번호 임의로 생성.
    console.log(req.body.params);
    let Save_auth = new Guide_Auth_info();
    Save_auth.Guide_Auth_Num =  req.body.params.Auth_Number;
    Save_auth.save(function(err,data){
        if(err){
            console.log(err);
        }
        else {
            res.json({data});
        }
    });
});
router.post('/guideAuth/check', function(req, res,next) { //가이드 등록번호 임의로 생성.
    console.log(req.body.params);
    Guide_Auth_info.find({Guide_Auth_Num : req.body.params.Auth_Number},function(err,data){
        if(err){
            console.log(err);
        }
        else {
            res.json({data});
        }
    })
});
router.post('/guideAuth/check', function(req, res,next) { //가이드 등록번호 임의로 생성.
    console.log(req.body.params);
    Guide_Auth_info.find({Guide_Auth_Num : req.body.params.Auth_Number},function(err,data){
        if(err){
            console.log(err);
        }
        else {
            res.json({data});
        }
    })
});
router.post('/check/time', function(req, res,next) { //가이드 등록번호 임의로 생성.
    console.log(req.body.params);
    Tourinfo.findOneAndUpdate({TourNum:req.body.params.target},{$set:{TourState :req.body.params.change_stat}},{new: true},function(err,data){
        if (err) {
            console.log(err);
        }
        console.log(data);
        res.send("된다")
    });
});
module.exports = router;