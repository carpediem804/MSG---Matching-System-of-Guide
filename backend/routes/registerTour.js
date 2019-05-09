const { Router } = require('express');
const router = Router();
const Tourcontent = require('../db/models/Tour');

router.post('/', function (req, res, next) {
    let saveTour = new Tourcontent();
    saveTour.UserID
    saveTour.TourImageURL = "아직구현안함";
    saveTour.TourTitle
    saveTour.TourLocation
    saveTour.TourMaxNum
    saveTour.TourMinNum
    saveTour.TourContent
    saveTour.TourPrice
    saveTour.TourApplyList
    saveTour.TourNowPeopleNum
    saveTour.TourThema
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
