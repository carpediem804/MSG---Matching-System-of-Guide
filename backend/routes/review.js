const { Router } = require('express');
const router = Router();
const reviewdata = require('../db/models/Review');
router.post('/', function(req, res,next) {
    console.log("review로들어옴");
    console.log(req.body);
    console.log(req.body.params);
    //가이드 아이디로 db찾고
    //content 추가하고
    // 별점 수정하고 -> 별점수정할때 peoplenum*totalgrade + 방금리뷰별점 / peoplenum+1 이 식이다.

    // peoplenum 하나 추가
    res.send("받음");

});

module.exports = router;