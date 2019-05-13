const { Router } = require('express');
const router = Router();
//const Image = require('../db/models/Images');
const Tourinfo = require('../db/models/Userinfo');
const applyguide = require('../db/models/Userinfo')
router.post('/register', function(req, res,next){
    console.log("checkinfo/register로 들어옴");
    console.log(req.body);
    console.log(req.body.params);

    //Tourinfo.find({Email:req.body.user.email}).exec()
});


module.exports = router;