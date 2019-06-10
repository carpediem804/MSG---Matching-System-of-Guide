const { mongoose, autoIncrement } = require('../mongo')

var ReviewSchema = new mongoose.Schema({

    TargetGuide: {
        type:String,
        required: true
    },
    writeID : String,
    writecontent :  String,
    ReviewGrade: Number,

});

module.exports = mongoose.model('Review', ReviewSchema);