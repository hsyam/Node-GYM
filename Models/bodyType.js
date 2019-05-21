const mongoose = require('mongoose')


let bodyTypeSchame = mongoose.Schema({
    name : {
        type: String , 
        required : true
    }
}, {timestamps : true})


module.exports = mongoose.model('Body_types' , bodyTypeSchame)