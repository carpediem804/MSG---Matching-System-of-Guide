const { mongoose } = require('../mongo')

const recipeSchma = new mongoose.Schema({
    justindex: {
        type: Number,
        unique: true
    },
    titles:{
        type:String
    },
    howtocook:{
        type:String
    },

})


module.exports = mongoose.model('recipe', recipeSchma)
