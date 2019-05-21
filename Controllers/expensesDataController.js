const _Model = require('./../Models/expenseData')
const moment = require('moment')
const joi = require('joi')
const _ = require('lodash')

exports.getAll = async (req, res , next)=>{
    await _Model.find({}).then((data)=>{
        res.json({
            status : true , 
            data: data
        })
    }).catch((err)=>{
        err.statusCode = 500 
        next(err)
    })
}

exports.create = async (req, res, next)=>{
    const data = req.body
    const schema = joi.object().keys({
        expense_id : joi.required(),
        cost : joi.required(),
        branch_id : joi.required(),
        date : joi.date().required(),
    })
    const validate = joi.validate(data , schema)
    if(validate.error){
        res.status(500).json({
            status: 'error',
            message: 'Invalid request data',
        })
    }else {
        let body = _.pick(data , ['expense_id' , 'cost' , 'branch_id' , 'date'])
        body.user_id = req.user._id
        let expenseData = new _Model(body)
        await expenseData.save().then((data)=>{
            res.json({
                status: true , 
                message: "Added successfully", 
                data: data
            })
        }).catch((err)=>{
            res.status(422).json({
                status: true , 
                message: "Cant Added", 
                data: data
            })
        }) 
    }
}

exports.getOne = async (req,res,next)=>{
    let id = req.params.id
    await _Model.findById(id).then(data=>{
        if(data){
            res.json({
                status : true , 
                data: data
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

exports.update = async (req,res,next)=>{
    let id = req.params.id
    const data = req.body
    const schema = joi.object().keys({
        expense_id : joi.required(),
        cost : joi.required(),
        branch_id : joi.required(),
        date : joi.date().required(),
    })
    const validate = joi.validate(data , schema)
    if(validate.error){
        res.status(500).json({
            status: 'error',
            message: 'Invalid request data',
        })
        return
    }else {
        await _Model.findByIdAndUpdate(id,data ,{new: false , useFindAndModify: false}).then((success)=>{
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
            }).catch((err)=>{
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