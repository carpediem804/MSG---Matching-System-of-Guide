const { Router } = require('express');
const router = Router();

const Tourinfo = require('../db/models/Tour');
const applyguide = require('../db/models/GuideRecruit');
const guideinfo = require('../db/models/ApplyRecruit');
const applyrecruit = require('../db/models/ApplyRecruit');
const userinfo = require('../db/models/Userinfo');
const Guide_Auth_info = require('../db/models/Guide_Auth');
const Token = require('../db/models/Token');

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
router.post('/check/token', function(req, res,next) {
    console.log(req.body.params);
    if(req.body.params.token === null || req.body.params.id === null){
        res.send("둘중에 하나라도 null 값 들어가있어서 아무것도 안했어.")
    }
    else{
        Token.findOneAndUpdate({Token:req.body.params.token},{$set:{ID:req.body.params.id}},{new: true},function(err,data){
            if (err) {
                console.log(err);
            }
            console.log(data);
            if(data === null){
                let new_token = new Token();
                new_token.ID = req.body.params.id;
                new_token.Token = req.body.params.token;
                new_token.save(function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("새로 저장 data" + data);
                    }
                });
            }
            else{
                res.send("기존 data" + data);
            }
    });
    }
});

router.post('/alarm', function(req, res,next){
    console.log(req.body.params);
    console.log("알람을 보냅니다!");

    Token.find({ID:req.body.params.target},function(err,data){
        console.log(data);
        console.log(data[0].Token);

        var FCM = require('fcm-node');

        var serverKey = 'AAAAtFt4CjY:APA91bHeJoV_099lT4ciq3MXjxVbn0YSgJeL2cQ-g1vkyH4IVaqKUoYHl7qPAaOiXy-OWVPERgP7N2fNwrtg6tJjnxoqiOdvT1D6Z6627N1GaR48Vvv7diMVUHDm_pwhDMq2ig-OvbS7';     //인증키
        var fcm = new FCM(serverKey);

        var client_token = data[0].Token;

        // console.log(typeof client_token)
        // console.log(typeof req.body.params.token)

        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: client_token,  //기기 토큰값

            notification: {
                title: req.body.params.title,   //제목
                body: req.body.params.comment  //보낼메시지
            },
        };

        fcm.send(message, function(err, response){
            console.log("들어왔다");
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });

    });

});

router.post('/guide/addtour', function(req, res,next){
    console.log(req.body.params.user_id);
    userinfo.findOne({Email: req.body.params.user_id},function(err,data){
        if(err){
            console.log(err);
        }
        else {
            console.log(data);
            const update_tour =  (data.Total_Tour+1)*1;
            userinfo.update({Email: req.body.params.user_id},{$set:{Total_Tour : update_tour}},function(err,data2){
                if(err){
                    console.log(err);
                }
                else {
                    console.log(data2);
                    res.send(data2);
                }
            });
        }
    });
});
module.exports = router;