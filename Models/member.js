const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name:{
        type: String ,
        required: true
    },
    password:{
        type: String ,
        required: true
    },
    gender:{
        type: String ,
        enum: ['male', 'female' , 'other'], 
        required: true
    },
    birthdate:{
        type: Date ,
        required: true
    },
    email:{
        type: String ,
        required: true,
        unique: true
    },
    address:{
        type: String ,
        required: true
    },
    phone:{
        type: String ,
        required: true, 
        unique: true
    },
    resetToken: {
        type: String,
    }, 
})

module.exports = mongoose.model('member',schema)