const { mongoose, autoIncrement } = require('../mongo')

const UserSchema = new mongoose.Schema({
    UserID: {
        type: Number,
        unique: true
    },
    User_ImageURL: {type:String,default : "default_image.jpg"},
    PWD:{type:String},
    Name:{
        type:String
    },
    Email:{
        type : String,
        unique : true
    },
    PhoneNum:{
        type : String
    },
    kakaoID:{
        type : String
    },
    Type : {
        type : String
    },
    Auth : {
        type : Number
    },
    GuideGrade :{
        type : Number
    },
    Total_Tour:{
        type : Number
    },
    Total_Review:{
        type : Number
    }
});

// userId를 Auto Increment 필드로 지정
 UserSchema.plugin(autoIncrement, {
     model: 'Userinfo',
     field: 'UserID',
     startAt: 0
 })

module.exports = mongoose.model('Userinfo', UserSchema);