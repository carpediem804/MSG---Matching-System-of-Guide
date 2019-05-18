const { Router } = require('express');
const router = Router();

const Tourinfo = require('../db/models/Tour');
const applyguide = require('../db/models/GuideRecruit')
const guideinfo = require('../db/models/ApplyRecruit')
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
})
router.post('/show', function(req, res,next) { //자신이 등록한 게시글에 신청한 사람정보 찾아서 보내기
    console.log(req.body.params);
    if(req.body.params.type == '여행객') {
        //가이드 정보 던지는거
        guideinfo.findOne({apply_post_num : req.body.params.target},function(err,data){
            if(err){
                console.log(err);
            }
            else {

            }
        })
    }
    else if (req.body.params.type == '가이드'){
        //여행자 정보 던지는거
    }
});
module.exports = router;