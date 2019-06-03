const { Router } = require('express');
const router = Router();
const applyguide = require('../db/models/ApplyRecruit');
const recruitguide = require('../db/models/GuideRecruit');

router.post('/', function (req, res, next) {
    console.log("confirm로 들어옴");
    console.log(req.body.params);

    recruitguide.findOneAndUpdate({RecruitNum:req.body.params.target},{$set:{GuideID:req.body.params.user,Apply_state:1}},{new: true},function(err,data) {
        if (err) {
            console.log(err);
        }
        console.log(data);
    });
    applyguide.findOneAndUpdate({apply_post_num:req.body.params.target,RecruitApplier: req.body.params.user},{$set:{apply_status:1}},{new: true},function(err,data) {
        if (err) {
            console.log(err);
        }
        console.log(data);
        res.send("된다")
    });
});
module.exports = router;