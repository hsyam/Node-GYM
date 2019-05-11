const mongoose = require('mongoose')

let UsersSchame = mongoose.Schema({
    name : {
        type : String , 
        require : true 
    }, 
    username : {
        type : String , 
        require : true 
    }, 
    email : {
        type : String , 
        require : true 
    }, 
    password : {
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
    department_id : {
        type : mongoose.Schema.Types.ObjectId , 
        ref: 'department'
    }, 
    branch_id : {
        type : mongoose.Schema.Types.ObjectId , 
        ref: 'branche',
        required: true
    },
    role: {
        type: String,
        require: true
    },
    resetToken: {
        type: String,
    }, 
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
})

 
UsersSchame.methods.toJSON = function(){
    let obj = this.toObject() 
    delete obj.password 
    delete obj.resetToken 
    return obj
}



module.exports = mongoose.model('user' , UsersSchame)