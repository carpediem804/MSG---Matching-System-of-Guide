const { mongoose, autoIncrement } = require('../mongo')

var GuideRecruitSchema = new mongoose.Schema({
    RecruitNum: {
        type: Number,
        unique: true
    },
    UserID: String,
    RecruitTitle: String,
    RecruitLocation: String,
    WriteTime: {type:Date, default:Date.now },
    From_time : String,
    To_time : String,
    RecruitPeopleNumber : Number,
    RecruitContent : String,
    ApplyGuideID :[],
});
GuideRecruitSchema.plugin(autoIncrement, {
    model: 'GuideRecruit',
    field: 'RecruitNum',
    startAt: 0
})
module.exports = mongoose.model('GuideRecruit', GuideRecruitSchema);