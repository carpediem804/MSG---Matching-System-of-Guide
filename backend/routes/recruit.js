const { Router } = require('express');
const router = Router();
const applyrecruit = require('../db/models/ApplyRecruit');
const guiderecruit = require('../db/models/GuideRecruit');
router.post('/apply', function (req, res, next) {
    console.log("post apply임");
    console.log(req.body.params);


});
router.post('/custom', function (req, res, next) {
    //console.log(req);
    console.log("/custom임");
    console.log(req.body.params);
    let savecustom = new guiderecruit();
    savecustom.UserID = req.body.params.recruitdata.id;
    savecustom.RecruitTitle = req.body.params.recruitdata.title;
    savecustom.RecruitLocation =req.body.params.recruitdata.location;
    savecustom.RecruitPeopleNumber = req.body.params.recruitdata.number;
    savecustom.RecruitContent = req.body.params.recruitdata.content;
    savecustom.From_time = Date.now();
    savecustom.To_time = Date.now();
    savecustom.ApplyRecruitID = "아직 안정햇다`";
    savecustom.save(function(err,data){
        if(err){
            console.log(err);
        }
        else {
            console.log("저장data "+data);
        }
    });


});
router.get('/custom', function (req, res, next) {
    guiderecruit.find(function(err,recruitdata){
        if(err) {
            console.log(err);
        }else{
            // console.log(tourdata);

            res.json({recruitdata});
        }
    });
});
module.exports = router;
