const mongoose = require('mongoose')
 

let DeparmentSchame = mongoose.Schema({
    name : {
        type : String , 
        require : true 
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
})

 

module.exports = mongoose.model('department' , DeparmentSchame)