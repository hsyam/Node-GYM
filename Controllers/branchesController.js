const BrancheModel = require('./../Models/branche')
const joi = require('joi')

exports.getAll = (req ,res , next)=>{ 
    BrancheModel.find({}).then((Branche)=>{
        res.json({
            status : true , 
            data: Branche
        })
    }).catch((err)=>{
        err.statusCode = 500 
        next(err)
    })
}


exports.getOne = (req ,res , next)=>{ 
    let id = req.params.id  
    
    BrancheModel.findById(id).then((Branche)=>{
        res.json({
            status : true , 
            data: Branche
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
        address : joi.string().required(),
        phone : joi.required(),
    })
    const validate = joi.validate(data , schema)
    if(validate.error){
        res.status(500).json({
            status: 'error',
            message: 'Invalid request data',
        })
    }else {
        const Branche = new BrancheModel()
        Branche.name = data.name 
        Branche.address = data.address 
        Branche.phone = data.phone 
        Branche.save().then((success)=>{
            res.json({
                status : true , 
                data: Branche, 
                data: success

            })
        }).catch((err)=>{
            res.status(500).json({
                status : false , 
                message: "cant Create"
            })
        })
    }

}

exports.update = (req, res)=>{
    let id = req.params.id 
    let data = req.body
    const schema = joi.object().keys({
        name: joi.string().required(),
        address: joi.string().required(),
        phone: joi.required(),
    })
    const validate = joi.validate(data , schema)
    if (validate.error) {
        res.status(500).json({
            status: 'error',
            message: 'Invalid request data',
        })
    }else {
        BrancheModel.findById(id).then((Branche)=>{
            Branche.name = data.name 
            Branche.address = data.address 
            Branche.phone = data.phone 
            Branche.save().then((success)=>{
                res.json({
                    status: true,
                    message: "Updated Success"
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

exports.delete = (req , res)=>{
    let id = req.params.id 
    BrancheModel.findByIdAndDelete(id).then((result)=>{
        res.json({
            status: true,
            message: "Sussess Deleted"
        })
    }).catch((err)=>{
        res.status(500).json({
            status: false,
            message: "Cant Deleted"
        })
    })
}