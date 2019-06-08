const { mongoose, autoIncrement } = require('../mongo')

var TokenSchema = new mongoose.Schema({
    TokenNum:{
        type: Number,
        unique: true
    },
    ID: String,
    Token :String
});

TokenSchema.plugin(autoIncrement, {
    model: 'token',
    field: 'TokenNum',
    startAt: 0
})
module.exports = mongoose.model('Token', TokenSchema);