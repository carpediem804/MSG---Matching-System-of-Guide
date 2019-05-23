const { mongoose, autoIncrement } = require('../mongo')

const Guide_AuthSchema = new mongoose.Schema({
    Guide_Auth_ID: {
        type: Number,
        unique: true
    },
    Guide_Auth_Num:{
        type : Number
    },
});

// userId를 Auto Increment 필드로 지정
Guide_AuthSchema.plugin(autoIncrement, {
    model: 'Guide_Auth',
    field: 'Guide_Auth_ID',
    startAt: 0
})

module.exports = mongoose.model('Guide_Auth', Guide_AuthSchema);