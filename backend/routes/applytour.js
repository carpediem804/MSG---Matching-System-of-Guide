const { Router } = require('express');
const router = Router();
const tourdata = require('../db/models/Tour');

router.post('/', function (req, res, next) {
    console.log("applytour로 들어옴");
    console.log(req.body.params);

    const peoplenum  = req.body.params.userInfo.TourNowPeopleNum + (req.body.params.Number*1);
    console.log("바꿔야되는 사람수 : "+peoplenum);
    tourdata.findOneAndUpdate({TourNum:req.body.params.userInfo.TourNum},{$push:{TourApplyList2:{user_apply_id:req.body.params.TourInfo, user_num:req.body.params.Number}},$set:{TourNowPeopleNum:peoplenum} },{new: true},function(err,data) {
        if (err) {
            console.log(err);
        }
        console.log(data);
        res.send("된다")
    });
});
module.exports = router;