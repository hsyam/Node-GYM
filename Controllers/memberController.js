const _Model = require('./../Models/member')
const joi = require('joi')
const _ = require('lodash')
const bcrypt = require('bcrypt')

exports.getAll = async (req, res ,next)=>{
    await _Model.find({}).then(data =>{
        res.json({
            status : true , 
            data: data
        })
    }).catch((err)=>{
        err.statusCode = 500 
        next(err)
    })
}

exports.create = async(req,res,next)=>{
    const data = req.body
    const schema = joi.object().keys({
        name: joi.string().required(),
        email: joi.string().required() ,
        gender: joi.string().valid('male' , 'fmale' , 'other'), 
        birthdate: joi.date().required(),
        address: joi.string().required() ,
        phone: joi.required() ,   
    })
    const validate = joi.validate(data , schema)
    if(validate.error){
        res.status(500).json({
            status: 'error',
            message: 'Invalid request data',
        })
    }else{
        let body = _.pick(data , ['name' , 'gender' , 'birthdate' , 'email' , 'address' , 'phone'])
        body.password = bcrypt.hashSync('123456', 10)
        let member = new _Model(body)
        await member.save().then(data=>{
            res.json({
                status: true , 
                message: "Added successfully", 
                data: data
            })
        }).catch(err=>{
            err.statusCode = 422
            err.message = "Email or Phone already exists"
            next(err)
        })
    }
}
exports.getOne = async (req,res,next)=>{
    let id = req.params.id 
    await _Model.findById(id).then(member=>{
        if(member){
            res.json({
                status : true , 
                data: member
            })
        }else{
            res.status(404).json({
                status : false , 
                message : "Entity Not Found"
            })
        }
    }).catch(err=>{
        res.status(404).json({
            status : false , 
            message : "Entity Not Found"
        })
    })
}
exports.update = async(req,res,next)=>{
    let id = req.params.id
    const data = req.body
    const schema = joi.object().keys({
        name: joi.string().required(),
        email: joi.string().required() ,
        gender: joi.string().valid('male' , 'fmale' , 'other'), 
        birthdate: joi.date().required(),
        address: joi.string().required() ,
        phone: joi.required() ,   
    })
    const validate = joi.validate(data , schema)
    if(validate.error){
        res.status(500).json({
            status: 'error',
            message: 'Invalid request data',
        })
        return
    }else{
        let body = _.pick(data , ['name' , 'gender' , 'birthdate' , 'email' , 'address' , 'phone'])

        await _Model.findOneAndUpdate(id,body ,{useFindAndModify: false})
        .then(success=>{
            if(success){
                res.json({
                    status : true , 
                    message: "Updated"
                })
            }else {
                res.status(404).json({
                    status : false , 
                    message : "Entity Not Found"
                })
            }
        }).catch(err=>{
            err.statusCode = 422
            err.message = "Email or Phone already exists"
            next(err)
        })

    }
}
exports.delete = async (req,res,next)=>{
    let id = req.params.id
    await _Model.findByIdAndRemove(id,{new: false , useFindAndModify: false}).then((success)=>{
        if(success){
            res.json({
                status : true , 
                message: "Deleted"
            })
        }else{
            res.status(404).json({
                status : false , 
                message : "Entity Not Found"
            })
        }
    }).catch((err)=>{
        next(err)
    })
}