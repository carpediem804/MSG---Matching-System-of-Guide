const { Router } = require('express');
const router = Router();
const upload = require('../multer/storage');
router.post('/',function(req,res,next){
    upload(req, res, function (err) {
        if (req.file == null || req.file == undefined || req.file == "") {
            res.json('No Image');
            console.log("이미지없음")
        }
        else {
            detectLandmarks(req.file.filename);
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
    //fileName = "../uploads/test11.jpg"
    //'Local image file, e.g. /path/to/image.png';

    // Performs landmark detection on the local file
    const [result] = await client.landmarkDetection(fileName);
    const landmarks = result.landmarkAnnotations;
    console.log('Landmarks:');
    landmarks.forEach(landmark => console.log(landmark));
    console.log("-----------\n"+landmarks);
    res.json(landmarks);
    // [END vision_landmark_detection]
}
module.exports = router ;