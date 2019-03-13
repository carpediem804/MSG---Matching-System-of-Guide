const { Router } = require('express');
const router = Router();
const blogdata = require('../db/models/Images');

router.post('/', function(req, res,next){
    console.log("remove로 들어옴");
    var id = req.body.removeId;
    console.log(req.body);
    console.log(id);
    blogdata.findById(id,function(err,task){
        if(err){
            console.log(err);
        }
        task.remove();
        console.log("remove 됨");
        res.json("됨");
    })


})

module.exports = router;