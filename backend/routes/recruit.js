const { Router } = require('express');
const router = Router();
const applyrecruit = require('../db/models/ApplyRecruit');
const guiderecruit = require('../db/models/GuideRecruit');
const upload = require('../multer/storage');

router.post('/apply', function (req, res, next) {
    console.log("post apply임");
    console.log(req.query.id);
    console.log(req.query.target);
    console.log(req.query.content);
    console.log(req.query.price);
    // const apply_post_num = req.body.params.target;
    var temp2 =0;
    upload(req, res, function (err) {
        if (req.file == null || req.file == undefined || req.file == "") {
           // res.json('No Image Set');
            temp2 =1;
            console.log("이미지없음")
        }
        let saveapply = new applyrecruit();
        if(temp2==0) {
            saveapply.apply_Image_URL = req.file.filename;
        }
                saveapply.RecruitApplier = req.query.id;
                saveapply.apply_post_num = req.query.target;
                saveapply.SuggestContent = req.query.content;
                saveapply.SuggestPrice = req.query.price;

                saveapply.save(function (err, data) {
                    if (err) {
                        console.log(err);
                        console.log("\n already라고 보냇당 \n")
                       res.send("already");
                    } else {
                        console.log("가이드가 신청한 데이터 저장 " + data);
                        //res.send("저장됨");
                        const apply_post_num = req.query.target;
                        //중복방지 해야되는데 일단 내비두자
                        guiderecruit.findOneAndUpdate({RecruitNum: apply_post_num}, {$push: {ApplyGuideID: req.query.id}}, {new: true}, function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            console.log(data);
                            res.send("done");
                        });
                       // res.send("done");
                    }
                });

    });
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
    savecustom.From_time = req.body.params.recruitdata.from_day
    savecustom.To_time = req.body.params.recruitdata.to_day

    savecustom.save(function(err,data){
        if(err){
            console.log(err);
        }
        else {
            console.log("저장data "+data);
        }
    });
    res.send("저장완료");
});
router.get('/custom', function (req, res, next) {
    guiderecruit.find(function(err,recruitdata){
        if(err) {
            console.log(err);
        }else{
            res.json({recruitdata});
        }
    });
});
router.get('/apply', function (req, res, next) {
    applyrecruit.find(function(err,applydata){
        if(err) {
            console.log(err);
        }else{
            res.json({applydata});
        }
    });
});
router.post('/check/time', function(req, res,next) {
    console.log(req.body.params);
    guiderecruit.findOneAndUpdate({RecruitNum:req.body.params.target},{$set:{Apply_state :req.body.params.change_stat}},{new: true},function(err,data){
        if (err) {
            console.log(err);
        }
        console.log(data);
        res.send("된다")
    });
});
module.exports = router;
