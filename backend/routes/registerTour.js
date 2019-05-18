const { Router } = require('express');
const router = Router();
const Tourcontent = require('../db/models/Tour');
const upload = require('../multer/storage');
router.post('/', function (req, res, next) {
    console.log("등록등록");
    console.log("req.file");
    console.log(req.query.userID);
    var temp = 0;
    upload(req, res, function (err) {
        if(req.file == null || req.file == undefined || req.file == ""){
            //res.json('No Image Set');
            temp = 1;
            console.log("이미지없음")
        }
                let saveTour = new Tourcontent();
                saveTour.UserID = req.query.userID;
                if(temp!=1) {
                    saveTour.TourImageURL = req.file.filename;
                }saveTour.TourTitle = req.query.title;
                saveTour.TourLocation = req.query.location;
                saveTour.TourMaxNum = req.query.maxNum;
                saveTour.TourMinNum = req.query.minNum;
                saveTour.TourContent = req.query.content;
                saveTour.TourPrice = req.query.price;

                saveTour.TourDayandTime_start = req.query.startDate;
                saveTour.TourDayandTime_end = req.query.endDate;
                saveTour.TourThema = req.query.thema;
                saveTour.save(function(err,data){
                    if(err){
                        console.log(err);
                    }
                    else {
                        console.log("저장data "+data);
                    }
                });
                res.send("된다");
    });


});
module.exports = router;
