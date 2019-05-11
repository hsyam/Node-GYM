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
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
})

 

module.exports = mongoose.model('Branche' , BrancheSchame)