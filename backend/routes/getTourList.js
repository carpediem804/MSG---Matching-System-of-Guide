const { Router } = require('express');
const router = Router();
const Tourcontent = require('../db/models/Tour');

router.get('/custom', function (req, res, next) {
   //  let resitemp = Tourcontent({
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
   // resitemp.save(function(error,data){
   //      if(error){
   //          console.log(error);
   //      }else{
   //          console.log("에러없이 doctor resi data : ");
   //          console.log(data);
   //      }
   //  });

   Tourcontent.find(function(err,tourdata){
       if(err) {
           console.log(err);
       }else{
          // console.log(tourdata);

           res.json({tourdata});
       }
   });

});

module.exports = router;