const mongoose = require('mongoose')
 

let DeparmentSchame = mongoose.Schema({
    name : {
        type : String , 
        require : true 
    },
    
}, {timestamps: true})

 

module.exports = mongoose.model('department' , DeparmentSchame)