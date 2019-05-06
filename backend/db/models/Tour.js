const { mongoose, autoIncrement } = require('../mongo')

var Tour_Schema = new mongoose.Schema({
    TourNum: {
        type: Number,
        unique: true
    },
    UserID: String,
    TourImageURL: String,
    TourTitle: String,
    TourLocation: String,
    TourDayandTime_start : { type:Date, default:Date.now },
    TourDayandTime_end : { type:Date, default:Date.now },
    TourMaxNum : Number,
    TourMinNum :Number,
    TourContent : String,
    TourPrice : Number,
    TourApplyList : String,
    Tour_create_date: { type:Date, default:Date.now },
    TourNowPeopleNum : Number,
    TourThema : String
});
Tour_Schema.plugin(autoIncrement, {
    model: 'tourinfo',
    field: 'TourNum',
    startAt: 0
});
module.exports = mongoose.model('tourinfo', Tour_Schema);