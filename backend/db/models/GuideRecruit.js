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
    From_time : {type:Date, default:Date.now },
    To_time : {type:Date, default:Date.now },
    RecruitPeopleNumber : Number,
    RecruitContent : String,
    ApplyRecruitID :String,
});
GuideRecruitSchema.plugin(autoIncrement, {
    model: 'GuideRecruit',
    field: 'RecruitNum',
    startAt: 0
})
module.exports = mongoose.model('GuideRecruit', GuideRecruitSchema);