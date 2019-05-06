const { mongoose, autoIncrement } = require('../mongo')

var ApplyRecruitSchema = new mongoose.Schema({
    ApplyRecruitID: {
        type: Number,
        unique: true
    },
    RecruitApplier: String,
    TargetRecruit: String,
    SuggestImageURL: String,
    SuggestLocation: String,
    SuggestContent: String,
    SuggestPrice:Number
});
ApplyRecruitSchema.plugin(autoIncrement, {
    model: 'ApplyRecruitModel',
    field: 'ApplyRecruitID',
    startAt: 0
})
module.exports = mongoose.model('ApplyRecruitModel', ApplyRecruitSchema);