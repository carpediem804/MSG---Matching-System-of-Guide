const { mongoose, autoIncrement } = require('../mongo')

var imagesSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    user: String,
    title : {
        type : String
    },
    body : {
        type : String
    },
    category : {
        type : String
    },
    blogId : {
        type : Number
    },
    authorname : {
        type : String
    },
    comment_date: {type: Date, default: Date.now()},
    heart : {
        type : Number
    },
    likeuserId : {
        type : String
    }
});
imagesSchema.plugin(autoIncrement, {
    model: 'image',
    field: 'blogId',
    startAt: 1
})

module.exports = mongoose.model('Image', imagesSchema);
