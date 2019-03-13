//const multer = require('multer');
const { Router } = require('express');
const router = Router();
//const Image = require('../db/models/Images');
const sns = require('../db/models/sns');
//const upload = require('../multer/storage');

router.post('/', function(req, res,next){
    console.log(req);
    console.log(req.body.params)
    let putsns = new sns();
    putsns.user = req.body.params.uid;
    putsns.nickname = req.body.params.nickName
    putsns.title = '';
    putsns.heart = 0;
    putsns.likeuserId = "_";
    putsns.save(function(err,data){
        if(err){
            console.log(err);
        }
    });
})

module.exports = router;