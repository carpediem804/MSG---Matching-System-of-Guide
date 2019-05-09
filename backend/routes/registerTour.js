const { Router } = require('express');
const router = Router();
const Tourcontent = require('../db/models/Tour');

router.post('/', function (req, res, next) {
    console.log(req.body)
    let saveTour = new Tourcontent();
    saveTour.UserID = req.body.params.TourItem.userId;
    saveTour.TourImageURL = "아직구현안함";
    saveTour.TourTitle = req.body.params.TourItem.title;
    saveTour.TourLocation = req.body.params.TourItem.location;
    saveTour.TourMaxNum = req.body.params.TourItem.maxNum;
    saveTour.TourMinNum = req.body.params.TourItem.minNum;
    saveTour.TourContent = req.body.params.TourItem.content;
    saveTour.TourPrice = req.body.params.TourItem.price;
   // saveTour.TourApplyList
   // saveTour.TourNowPeopleNum
    saveTour.TourThema = req.body.params.TourItem.thema;
    saveTour.save(function(err,data){
        if(err){
            console.log(err);
        }
        else {
            console.log("저장data "+data);
        }
    });

});
module.exports = router;
