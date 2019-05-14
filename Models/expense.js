const mongoose = require('mongoose')


let expensesSchame = mongoose.Schema({
    name : {
        type: String , 
        required : true
    }
}, {timestamps : true})


module.exports = mongoose.model('exprense' , expensesSchame)