const { Router } = require('express');
const router = Router();
const reviewdata = require('../db/models/Review');
const userinfo = require('../db/models/Userinfo');
router.post('/', function(req, res,next) {
    console.log("review로들어옴");
    console.log(req.body);
    console.log(req.body.params);

    userinfo.findOne({Email: req.body.params.guideID},function(err,data){
    if(err){
        console.log(err);
    }
    else {
        console.log("찾은 data" + data);
        const updatereviewnum =  (data.Total_Review+1)*1;
        const updategrade =   ((data.GuideGrade * (updatereviewnum-1)*1) + req.body.params.mystar*1) / updatereviewnum;
        var test2 = updategrade.toFixed(2);
        console.log("updatereviewnum" + updatereviewnum);
        console.log("updategrade"+test2);
        userinfo.update({Email: req.body.params.guideID},{$set:{Total_Review : updatereviewnum,GuideGrade:test2}},function(err,seconddata){
            if(err){
                console.log(err);
            }
            else {
               // console.log("second data" + seconddata);
                let savereview = new reviewdata();
                savereview.TargetGuide =  req.body.params.guideID;
                savereview.writeID = req.body.params.myuserID;
                savereview.writecontent = req.body.params.mytext;
                savereview.ReviewGrade = req.body.params.mystar;
                savereview.save(function (err, data) {
                    if (err) {
                        console.log(err);
                        res.send("err");
                    } else {
                        console.log("review 저장 데이터 " + data);
                       res.send("저장완료");
                    }//else
                });//savereview
            }
        });

        };//else
    });//userinfo change

});
router.post('/list', function(req, res,next) {
    console.log(req.body.params);
    reviewdata.find({TargetGuide : req.body.params.guideID},function(err,totaldata){
        if(err){
            console.log("review 안에서 가이드거 찾기 오류 "+err);
        }
        else {
            console.log("보내는 데이터  : "+totaldata);
            res.json(totaldata);
        }
    });
})
module.exports = router;