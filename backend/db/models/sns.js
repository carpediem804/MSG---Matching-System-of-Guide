const { mongoose, autoIncrement } = require('../mongo')

var snsSchema = mongoose.Schema({
    image: {
        type: String,
        //required: true
    },
    user: {
        type : String,
        required: true
    },
    title : {
        type : String
    },

    comment_date: {type: Date, default: Date.now()},
    heart : {
        type : Number
    },
    likeuserId : {
        type : String
    },
    nickname : {
        type : String
    },
    snsId : {
        type :Number
    }
});
 snsSchema.plugin(autoIncrement, {
     model: 'sns',
     field: 'snsId',
     startAt: 1
 })

module.exports = mongoose.model('sns', snsSchema);
