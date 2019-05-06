const { mongoose, autoIncrement } = require('../mongo')

const UserSchema = new mongoose.Schema({
    UserID: {
        type: Number,
        unique: true
    },
    loginID:{
        type:String
    },
    Name:{
        type:String
    },
    Email:{
        type : String
    },
    PhoneNum:{
        type : String
    },
    kakaoID:{
        type : String
    },
    Type : {
        type : Number
    },
    GuideGrade :{
        type : Number
    }
});

// userId를 Auto Increment 필드로 지정
 UserSchema.plugin(autoIncrement, {
     model: 'Usermodel',
     field: 'UserID',
     startAt: 0
 })

module.exports = mongoose.model('Usermodel', UserSchema);