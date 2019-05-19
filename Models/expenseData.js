const mongoose = require('mongoose')


let expensesDataSchame = mongoose.Schema({
    expense_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'exprense', 
        require: true
    },
    cost :{
        type: String, 
        require: true
    },
    branch_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Branche', 
        require: true
        
    },
    date :{
        type: Date, 
        require: true
    },
    user_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
})

module.exports = mongoose.model('expense_data' , expensesDataSchame)