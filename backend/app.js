const express = require('express')
const bodyParser = require('body-parser')

require('./db/mongo') //connect db
const getTourList = require('./routes/getTourList')
const registerTour = require('./routes/registerTour')
const recruit = require('./routes/recruit')
const signup = require('./routes/signup')
const checkinfo = require('./routes/checkinfo')
const applytour = require('./routes/applytour')
const confirm = require('./routes/confirm');
const imagesearch = require('./routes/imagesearch');
const app = express()

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next()
})

app.use(express.static('uploads')); //서버에 저장되는 이미지 파일들
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/getTourList', getTourList);
app.use('/registerTour', registerTour);
app.use('/registUserInfo',signup);
app.use('/recruit',recruit);
app.use('/checkInfo',checkinfo);
app.use('/applyTour',applytour);
app.use('/confirm',confirm);
app.use('/imagesearch',imagesearch);
module.exports = app;
