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
    TourDayandTime_start : { type:Date },
    TourDayandTime_end : { type:Date },
    TourMaxNum : Number,
    TourMinNum :Number,
    TourContent : String,
    TourPrice : Number,
    TourApplyList : [],
    Tour_create_date: { type:Date, default:Date.now },
    TourNowPeopleNum : {type:Number, default:0},
    TourThema : String
});
Tour_Schema.plugin(autoIncrement, {
    model: 'tourinfo',
    field: 'TourNum',
    startAt: 0
});
module.exports = mongoose.model('tourinfo', Tour_Schema);