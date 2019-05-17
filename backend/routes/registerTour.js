const { Router } = require('express');
const router = Router();
const Tourcontent = require('../db/models/Tour');
const upload = require('../multer/storage');
router.post('/', function (req, res, next) {
    console.log("등록등록");
    console.log("req.file");
    console.log(req.query.TourItem);
    console.log(req.query.TourItem)
    console.log(req.query.TourItem.userId);
    upload(req, res, function (err) {
        if(req.file == null || req.file == undefined || req.file == ""){
            res.json('No Image Set');
            console.log("이미지없음")
        }else{
            if(err){
            console.log(err);
            }
            else{
                let saveTour = new Tourcontent();
                saveTour.UserID = req.query.TourItem.userId;
                saveTour.TourImageURL = req.file.filename;
                saveTour.TourTitle = req.query.TourItem.title;
                saveTour.TourLocation = req.query.TourItem.location;
                saveTour.TourMaxNum = req.query.TourItem.maxNum;
                saveTour.TourMinNum = req.query.TourItem.minNum;
                saveTour.TourContent = req.query.TourItem.content;
                saveTour.TourPrice = req.query.TourItem.price;

                saveTour.TourDayandTime_start = req.query.TourItem.startDate;
                saveTour.TourDayandTime_end = req.query.TourItem.endDate;
                saveTour.TourThema = req.query.TourItem.thema;
                saveTour.save(function(err,data){
                    if(err){
                        console.log(err);
                    }
                    else {
                        console.log("저장data "+data);
                    }
                });
                res.send("된다");
            }
        }
    });


});
module.exports = router;
