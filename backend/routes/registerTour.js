const { Router } = require('express');
const router = Router();
const Tourcontent = require('../db/models/Tour');
const upload = require('../multer/storage');
router.post('/', function (req, res, next) {
    console.log("등록등록");
    console.log("req.file");
    console.log(req.query.TourDayandTime_start);
    console.log(req.query.TourDayandTime_end);
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
                    //이미지 있을 경우
                    detectLandmarks(req.file.filename).then(function (senddata) {
                        if(senddata[0]){
                            console.log(senddata);
                            saveTour.TourImageiswhat = senddata[0].description;
                        }
                        saveTour.TourTitle = req.query.title;
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
                }
                else {
                    saveTour.TourTitle = req.query.title;
                    saveTour.TourLocation = req.query.location;
                    saveTour.TourMaxNum = req.query.maxNum;
                    saveTour.TourMinNum = req.query.minNum;
                    saveTour.TourContent = req.query.content;
                    saveTour.TourPrice = req.query.price;
                    saveTour.TourDayandTime_start = req.query.startDate;
                    saveTour.TourDayandTime_end = req.query.endDate;
                    saveTour.TourThema = req.query.thema;
                    saveTour.save(function (err, data) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("저장data " + data);
                        }
                    });
                    res.send("된다");
                }
    });


});
async function detectLandmarks(fileName) {
    // [START vision_landmark_detection]
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    fileName = "./uploads/" + fileName ;

    const [result] = await client.landmarkDetection(fileName);
    const landmarks = result.landmarkAnnotations;

    return landmarks;

    // [END vision_landmark_detection]
}
module.exports = router;
