const { mongoose, autoIncrement } = require('../mongo')

var ApplyRecruitSchema = new mongoose.Schema({
    ApplyRecruitID: {
        type: Number,
        unique: true
    },
    apply_Image_URL: {type:String, default : "noimage.png"},
    apply_post_num : {type :Number },
    SuggestContent: String,
    SuggestPrice : Number,
    RecruitApplier :String,
    apply_status : {type:Number, default : 0} // 0:대기중 , 1:선택됨 , 2 : 선택안됨
});
ApplyRecruitSchema.plugin(autoIncrement, {
    model: 'applyrecruit',
    field: 'ApplyRecruitID',
    startAt: 0
})
module.exports = mongoose.model('applyrecruit', ApplyRecruitSchema);