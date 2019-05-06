const { mongoose, autoIncrement } = require('../mongo')

var TourSchema = new mongoose.Schema({
    TourNum: {
        type: Number,
        unique: true
    },
    UserID: String,
    TourImageURL: String,
    TourTitle: String,
    TourLocation: String,
    TourDayandTime : Date,
    TourMaxNum : Number,
    TourMinNum :Number,
    TourContent : String,
    TourPrice : Number,
    TourApplyList : String,
    Tour_create_date: { type:Date, default:Date.now },
    TourNowPeopleNum : Number
});
TourSchema.plugin(autoIncrement, {
    model: 'Tourmodel',
    field: 'TourNum',
    startAt: 0
})
module.exports = mongoose.model('Tourmodel', TourSchema);