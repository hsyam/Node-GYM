const mongoose = require('mongoose')


let paymentSchame = mongoose.Schema({
    name : {
        type: String , 
        required : true
    }
}, {timestamps : true})


module.exports = mongoose.model('payment' , paymentSchame)