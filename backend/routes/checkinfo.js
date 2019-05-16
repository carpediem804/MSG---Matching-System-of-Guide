const { Router } = require('express');
const router = Router();
//const Image = require('../db/models/Images');
const Tourinfo = require('../db/models/Tour');
const applyguide = require('../db/models/GuideRecruit')
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


module.exports = router;