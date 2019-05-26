const mongoose = require('mongoose')

let UsersSchame = mongoose.Schema({
    name : {
        type : String , 
        required : true 
    }, 
    username : {
        type : String , 
        required : true 
    }, 
    email : {
        type : String , 
        required : true,
        unique: true
    }, 
    password : {
        type : String , 
        required : true 
    }, 
    phone : {
        type : String , 
        required : true,
        unique: true
    }, 
    address : {
        type : String , 
        required : true 
    }, 
    department_id : {
        type : mongoose.Schema.Types.ObjectId , 
        ref: 'department',
        required : true 
    }, 
    branch_id : {
        type : mongoose.Schema.Types.ObjectId , 
        ref: 'branche',
        required: true
    },
    role: {
        type: String,
        required: true
    },
    resetToken: {
        type: String,
    }, 
    
}, {timestamps: true})

 
UsersSchame.methods.toJSON = function(){
    let obj = this.toObject() 
    delete obj.password 
    delete obj.resetToken 
    return obj
}



module.exports = mongoose.model('user' , UsersSchame)