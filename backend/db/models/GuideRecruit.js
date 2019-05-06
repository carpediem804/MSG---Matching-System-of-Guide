const { mongoose, autoIncrement } = require('../mongo')

var GuideRecruitSchema = new mongoose.Schema({
    RecruitNum: {
        type: Number,
        unique: true
    },
    UserID: String,
    RecruitTitle: String,
    RecruitLocation: String,
    RecruitDayandTime: Date,
    RecruitPeopleNumber : Number,
    RecruitContent : String,
    ApplyRecruitID :Number,

});
GuideRecruitSchema.plugin(autoIncrement, {
    model: 'GuideRecruitmodel',
    field: 'RecruitNum',
    startAt: 0
})
module.exports = mongoose.model('GuideRecruitmodel', GuideRecruitSchema);