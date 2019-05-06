const { Router } = require('express');
const router = Router();
const applyrecruit = require('../db/models/ApplyRecruit');
router.post('/apply', function (req, res, next) {
    //  let resitemp = applyrecruit({
    //      UserID : "kki",
    //      TourImageURL:  "ABCD",
    //      TourTitle: "버거킹",
    //      TourLocation: "대전",
    //      TourMaxNum: 15,
    //      TourMinNum: 5,
    //      TourContent: "버거킹없지만 찾아먹으러가보자",
    //      TourPrice: 150000,
    //      TourApplyList: "a,b,c,d",
    //      TourNowPeopleNum: 3,
    //      TourThema : "먹방"
    //  })
    // applyrecruit.save(function(error,data){
    //      if(error){
    //          console.log(error);
    //      }else{
    //          console.log("에러없이 doctor resi data : ");
    //          console.log(data);
    //      }
    //  });

});
router.post('/', function (req, res, next) {
    //console.log(req);
    console.log(req.body.params);
});

module.exports = router;
