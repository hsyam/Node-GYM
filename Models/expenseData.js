const mongoose = require('mongoose')


let expensesDataSchame = mongoose.Schema({
    expense :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'exprense', 
        required: true
    },
    cost :{
        type: String, 
        required: true
    },
    branch :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Branche', 
        required: true
        
    },
    date :{
        type: Date, 
        required: true
    },
    user_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
},{timestamps:true})

module.exports = mongoose.model('expense_data' , expensesDataSchame)