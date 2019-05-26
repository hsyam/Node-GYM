const mongoose = require('mongoose')
 

let DeparmentSchame = mongoose.Schema({
    name : {
        type : String , 
        required : true 
    },
    
}, {timestamps: true})

 

module.exports = mongoose.model('department' , DeparmentSchame)