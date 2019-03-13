//const multer = require('multer');
const { Router } = require('express');
const router = Router();
const Image = require('../db/models/Images');
const sns = require('../db/models/sns');
const upload = require('../multer/storage');


router.post('/myuser', function(req, res,next){
    console.log("upload/myuser 들어옴")
    console.log(req.body);
    console.log(req.body.mymynick)
    Image.find({authorname : req.body.mymynick}).then(mylist=>{
        res.json({myarticle : mylist})
    })
    //console.log(req);
    // Image.find().then(dblist=>{
    //     // console.log(dblist);
    //     res.json({bloglist : dblist});
    // })
})
router.get('/img', function(req, res,next){
    console.log("upload/img로 들어옴")
    Image.find().then(dblist=>{
       // console.log(dblist);
        res.json({bloglist : dblist});
    })
})
router.post("/img", function(req, res) {
    console.log("img upload");
    //console.log(req.body.title);
   // console.log(req);
    console.log(req.query.title);
    console.log(req.query.bodycotent);
   // console.log("author : "+ req.query.author);
    //console.log(req.file);
    upload(req, res, function (err) {
        if(req.file == null || req.file == undefined || req.file == ""){
            res.json('No Image Set');
            console.log("이미지없음")
        }else{
            if (err) {
                console.log(err);
            }else{
                let image = new Image();
                image.image = req.file.filename;
                image.title = req.query.title;
                image.body = req.query.bodycotent;
                image.category = req.query.category;
                //image.blogId = req.query.blogId;
                image.authorname = req.query.author;
                image.heart = 0;
                image.likeuserId = "";
                console.log(image.authorname);
                image.save(()=>{
                    if (err) return next(err);
                });
                res.send("됫다됫다");
                console.log("보냇음 보냇음");
                //console.log(image);
            }
        }
    });
    //res.send("저장완료");

});
router.post("/userimg",function(req, res) {
    console.log("userimg로들어옴");
    //console.log(req.query);
    console.log(req.query.uid);
    console.log(req.query.nickName)
    //console.log(req.query.uid)
    //console.log(req.body.uid);

    upload(req, res, function (err) {
        if (req.file == null || req.file == undefined || req.file == "") {
            res.json('No Image Set');
            console.log("이미지없음")
        } else {
            if (err) {
                console.log(err);
            } else {

                sns.findOneAndUpdate({user:req.query.uid},{$set : {nickname : req.query.nickName , image : req.file.filename  }},function(err,tank){
                    if(err) {
                        res.send('false');
                        return console.log(err);
                    }
                    res.send('true');
                })

            }
        }
    })//upload
})//router
router.post("/userThink",function(req, res) {
    console.log("user Think 들어옴");
    console.log(req.body);
    var uid = req.body.uid;
    console.log(uid);
    var putitle = req.body.content;
    console.log(putitle)
    //var nickname = req.body.nickName;
    let upgradsns = new sns();
    upgradsns.user = uid;
    upgradsns.nickname = req.body.nickName;
    upgradsns.title = putitle;
    upgradsns.heart = 0;
    upgradsns.likeuserId = '_';
    sns.findOne({user:uid},'image',function(err,imagename){
        //console.log(imagename);
        //var imageurl = imagename;

    }).then(aa =>{

        upgradsns.image = aa.image;

        upgradsns.save(function(err,data){
            if(err){
                console.log(err);
                res.send('false')
            }
            res.send('true')
        });

    })



    // sns.findOneAndUpdate({user:uid},{$set : {title : putitle }},function(err,tank){
    //     if(err) {
    //         res.send('false');
    //         return console.log(err);
    //     }
    //     res.send('true');
    // })

})
router.get('/userThink',function(req,res){
    console.log("userthink 데이터가져가기로 로 들어옴")
    sns.find().then(dblist=>{
        // console.log(dblist);
        res.json({snslist : dblist});
    })
})




module.exports = router;
