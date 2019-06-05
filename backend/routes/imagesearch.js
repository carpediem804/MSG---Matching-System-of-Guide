const { Router } = require('express');
const router = Router();
const upload = require('../multer/storage');
var temp ;
router.post('/',function(req,res,next){
    console.log("들어옴닺ㅂ럽지ㅏ러ㅏㅁ");
    upload(req, res, function (err) {
        if (req.file == null || req.file == undefined || req.file == "") {
            res.json('No Image');
            console.log("이미지없음")
        }
        else {
         //   console.log("laskdfjiaoewfjasdlkfs\n"+detectLandmarks(req.file.filename));
            detectLandmarks(req.file.filename).then(function(senddata){


             senddata.forEach(data => console.log(data));
               res.json(senddata);
            });

           //console.log(senddata);
//            res.send(detectLandmarks(req.file.filename));

        }
    })
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
    //console.log(fileName);
   // const fileName2 = "C:\\Users\\carpe\\Desktop\\testfolider\\MSG---Matching-System-of-Guide\\backend\\uploads\\test.jpg"
    //'Local image file, e.g. /path/to/image.png';

    // Performs landmark detection on the local file
    const [result] = await client.landmarkDetection(fileName);
    const landmarks = result.landmarkAnnotations;
    console.log(landmarks);
   // console.log(landmarks.description);
    // console.log('Landmarks:');
    // console.log("landmark[0] = " +landmarks[0][0]);
    // landmarks.forEach(landmark => console.log(landmark));
    //console.log("-----------\n"+landmarks);
     temp = landmarks
    //temp2 = 1;
    return landmarks;

    // [END vision_landmark_detection]
}
module.exports = router ;