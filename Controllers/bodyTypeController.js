const _Model = require('./../Models/bodyType')
const joi = require('joi')
exports.getAll = async (req , res)=>{
    let bodyType = await _Model.find({}).then((data)=>{
        res.json({
            status : true ,
            data : data
        })
    }).catch((err)=>{
        err.statusCode = 500 
        next(err)
    })
}
exports.getOne = async (req , res,next)=>{
    let id = req.params.id
    let bodyType = await _Model.findById(id).then((data)=>{
        res.json({
            status : true ,
            data : data
        })
    }).catch((err)=>{
        err.statusCode = 500 
        next(err)
    })
}
exports.Create = async (req , res ,next)=>{
    const data = req.body 
    const schema = joi.object().keys({
        name : joi.string().required(),
    })
    const validate = joi.validate(data , schema)
    if(validate.error){
        res.status(500).json({
            status: 'error',
            message: 'Invalid request data',
        })
    }else {
        let bodyType = await new _Model(data)
        bodyType.save().then((data)=>{
            res.json({
                status: true , 
                message: "BodyType Add successfully",
                data: data
            })
        }).catch((err)=>{
            next(err)
        })
        
    }
}
exports.update = async (req , res,next)=>{
    let id = req.params.id 
    let data = req.body
    const schema = joi.object().keys({
        name : joi.string().required(),
    })
    const validate = joi.validate(data , schema)
    if (validate.error) {
        res.status(500).json({
            status: 'error',
            message: 'Invalid request data',
        })
    }else {
        await _Model.findById(id).then((bodyType)=>{
            bodyType.name = data.name
            bodyType.save().then((success)=>{
                res.json({
                    status: true,
                    message: "Updated Success", 
                    data: success
                })
            }).catch((err)=>{
                res.status(500).json({
                    status: false,
                    message: "Updated Fail"
                })
            })
        }).catch((err)=>{
            res.status(404).json({
                status: false,
                message: "Not Found"
            })
        })
    }
}
exports.delete = async (req , res)=>{
    let id = req.params.id 
    _Model.findByIdAndDelete(id).then((result)=>{
        if(result){
            res.json({
                status: true,
                message: "Sussess Deleted"
            })
        }else{
            res.status(404).json({
                status: false,
                message: "Entity Not Found"
            })
        }
    }).catch((err)=>{
        res.status(500).json({
            status: false,
            message: "Cant Deleted"
        })
    })
}