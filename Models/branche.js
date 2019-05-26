const mongoose = require('mongoose')
 

let BrancheSchame = mongoose.Schema({
    name : {
        type : String , 
        required : true 
    },
    phone : {
        type : String , 
        required : true 
    },
    address : {
        type : String , 
        required : true 
    },
 
}, {timestamps: true})

 

module.exports = mongoose.model('Branche' , BrancheSchame)