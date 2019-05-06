const { mongoose, autoIncrement } = require('../mongo')

var ReviewSchema = new mongoose.Schema({
    WriterID: {
        type: String
    },
    TargetGuide: {
        type:String,
        required: true
    },
    ReviewGrade: Number,
    TotalGrade: String,
    PeopleNum: String,
});

module.exports = mongoose.model('ApplyRecruitModel', ReviewSchema);