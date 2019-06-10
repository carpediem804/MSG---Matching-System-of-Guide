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
            console.log("되고있따아앙~~ ");
         //   console.log("laskdfjiaoewfjasdlkfs\n"+detectLandmarks(req.file.filename));

               detectLandmarks(req.file.filename).then(function (senddata) {
                        if(senddata[0]) {
                            //   console.log(senddata);
                            senddata.forEach(data => console.log(data));
                            // console.log("senddata[0]"+senddata[0]);
                            console.log(senddata[0].description);
                            res.json(senddata);
                        }
                        else{
                            res.json("없음");
                        }
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

    const [result] = await client.landmarkDetection(fileName);
    const landmarks = result.landmarkAnnotations;
    // temp = landmarks
    return landmarks;

    // [END vision_landmark_detection]
}
module.exports = router ;