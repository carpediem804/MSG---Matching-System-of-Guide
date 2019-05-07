//const multer = require('multer');
const { Router } = require('express');
const router = Router();
//const Image = require('../db/models/Images');
const userinfo = require('../db/models/Userinfo');
//const upload = require('../multer/storage');

router.post('/signup', function(req, res,next){
    //console.log(req);

    console.log(req.body)
     let saveuser = new userinfo();
    saveuser.Email = req.body.user.email;
    saveuser.Name = req.body.user.name;
    saveuser.PWD =req.body.user.password;
    saveuser.PhoneNum =req.body.user.phoneNum;
    saveuser.kakaoID = req.body.user.kakaoId;
    saveuser.Type = req.body.user.type;

    saveuser.save(function(err,data){
        if(err){
            console.log(err);
        }
        else {
            console.log("저장data "+data);
        }
    });
})
router.post('/login',function(req,res,next){
    console.log(req.body);
    userinfo.findOne({Email:req.body.email}).exec()
        .then(user_info=>{
            console.log("userinfo : "+user_info);
            res.json({user_info});
        })
})

module.exports = router;