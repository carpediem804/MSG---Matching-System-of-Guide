const { Router } = require('express')
const cookModel = require('../db/models/cook')
//const patientModel = require('../db/models/patient')
var ps = require('python-shell');
const recipeModel = require('../db/models/recipe')
//var crawler = require('youtube-crawler');
const router = Router()
//var answer=0;
/* ... */
var send_data = []

router.post('/recipe', function(req, res){
    console.log("/recipe로 들어옴")
    console.log(req.body.titles);
    recipeModel.findOne({titles: req.body.titles}).exec()
        .then(recipe =>{
            console.log(recipe);
            res.json({recipe});
        })
})



router.post('/',function(req,res,next){
    send_data.splice(0,send_data.length)
    console.log("/들어옴")
    var args = req.body.checkedNames;
    console.log("args = ", args);
    var options = {
        mode: 'text',

        pythonPath: '',

        pythonOptions: ['-u'],

        scriptPath: '',

        args: args,//req.body

    };
    ps.PythonShell.run('.\\routes\\findcookname.py',options,function (err,result) {
        if(err) throw err;

        console.log("results %j",result);
        console.log("------results 0 ----",result[0]);
        var aaaa = result[0].replace("[[","");
        //console.log(aaaa);
        aaaa = aaaa.replace("]]","");
        aaaa = aaaa.replace("]","");
        aaaa = aaaa.replace("[","");
        //aaaa = aaaa.replace(" ","");
        aaa = aaaa.split(' ');
        console.log("14214214 result : ",aaa);
        console.log("result 1 : ",aaa[0]);
        console.log("reusult 2 : ",aaa[1]);
        console.log("reuslt 3 :", aaa[2]);
        var find_first = aaa[0]
        var find_second = aaa[1]
        var find_third = aaa[2]
        cookModel.findOne({recipeId : Number(find_first)+1}).exec()
            .then(first =>{
                console.log(first);
                send_data = send_data.concat(first)

                var first_url = "https://www.youtube.com/results?search_query="+first.title+"만드는법"
                console.log(first_url);
                send_data = send_data.concat(first_url)

            });
        cookModel.findOne({recipeId: Number(find_second)+1}).exec()
            .then(second =>{
                console.log(second);
                send_data = send_data.concat(second)

                var second_url = "https://www.youtube.com/results?search_query="+second.title+"만드는법"
                console.log(second_url);
                send_data = send_data.concat(second_url)

            });
        cookModel.findOne({recipeId: Number(find_third)+1}).exec()
            .then(third =>{
                console.log(third);
                send_data = send_data.concat(third)

                var third_url = "https://www.youtube.com/results?search_query="+third.title+"만드는법"
                console.log(third_url);
                send_data = send_data.concat(third_url)
                res.json({send_data});
            })

    })//파이썬 쉘
//console.log(answer);
    //배열로 만드것은 py파일로 보내서 결과값 출력하는거다!
});

//router.get('/recommend',function(req,res){
//    res.json({send_data});
//});
module.exports = router
