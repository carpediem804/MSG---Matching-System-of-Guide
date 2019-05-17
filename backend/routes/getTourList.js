const { Router } = require('express');
const router = Router();
const Tourcontent = require('../db/models/Tour');

router.get('/custom', function (req, res, next) {

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