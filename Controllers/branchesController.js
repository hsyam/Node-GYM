const Brache = require('./../Models/branche')
const joi = require('joi')

exports.getAll = (req ,res , next)=>{ 
    Brache.find({}).then((Braches)=>{
        res.json({
            status : true , 
            data : Braches
        })
    }).catch((err)=>{
        err.statusCode = 500 
        next(err)
    })
}


exports.getOne = (req ,res , next)=>{ 
    let id = req.params.id  
    
    Brache.findById(id).then((Brache)=>{
        res.json({
            status : true , 
            data : Brache
        })
    }).catch((err)=>{
        res.status(404).json({
            status : false , 
            message : "Not Found"
        })
    })
}


exports.Create = (req , res)=>{

    const data = req.body
    const schema = joi.object().keys({
        name : joi.string().required(),
    })
    const validate = joi.validate(data , schema)
    if(validate.error){
        res.json({
            status: 'error',
            message: 'Invalid request data',
        })
    }else {
        const Brache = new Brache()
        Brache.name = data.name 
        Brache.save().then((success)=>{
            res.json({
                status : true , 
                data : Brache
            })
        }).catch((err)=>{
            res.json({
                status : false , 
                message: "cant Create"
            })
        })
    }

}