const { Router } = require('express');
const router = Router();
const applyguide = require('../db/models/ApplyRecruit');
const recruitguide = require('../db/models/GuideRecruit');

router.post('/', function (req, res, next) {
    console.log("confirm로 들어옴");
    console.log(req.body.params);
    //guide가 신청한 글의 상태를 확정이라고 바꾸어야 댄당
    //그리고 알람을 줘야되는데 (확정되자마자)

    //그 가이드 모집글의 상태를 바꿔줘야댄다
});
module.exports = router;