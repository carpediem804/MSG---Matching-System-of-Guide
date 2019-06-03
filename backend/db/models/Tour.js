const { mongoose, autoIncrement } = require('../mongo')

var Tour_Schema = new mongoose.Schema({
    TourNum: {
        type: Number,
        unique: true
    },
    UserID: String,
    TourImageURL: {type:String,default : "default_image.jpg"},
    TourTitle: String,
    TourLocation: String,
    TourDayandTime_start : String,
    TourDayandTime_end : String,
    TourMaxNum : Number,
    TourMinNum :Number,
    TourContent : String,
    TourPrice : Number,
    TourApplyList2 : [{user_apply_id:String, user_num:Number}],
    Tour_create_date: { type:Date, default:Date.now },
    TourNowPeopleNum : {type:Number, default:0},
    TourThema : String,
    TourState : {type:Number, default:0}  // 0:아직 구하는 중 , 1 : 완료 , 2: 기간지남 ??
});
Tour_Schema.plugin(autoIncrement, {
    model: 'tourinfo',
    field: 'TourNum',
    startAt: 0
});
module.exports = mongoose.model('tourinfo', Tour_Schema);