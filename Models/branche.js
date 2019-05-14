const mongoose = require('mongoose')
 

let BrancheSchame = mongoose.Schema({
    name : {
        type : String , 
        require : true 
    },
    phone : {
        type : String , 
        require : true 
    },
    address : {
        type : String , 
        require : true 
    },
 
}, {timestamps: true})

 

module.exports = mongoose.model('Branche' , BrancheSchame)