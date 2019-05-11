const departmenteModel = require('./../Models/department')
const joi = require('joi')

exports.getAll = (req ,res , next)=>{ 
    departmenteModel.find({}).then((Department)=>{
        res.json({
            status : true , 
            data: Department
        })
    }).catch((err)=>{
        err.statusCode = 500 
        next(err)
    })
}


exports.getOne = (req ,res , next)=>{ 
    let id = req.params.id  
    
    departmenteModel.findById(id).then((Department)=>{
        
        res.json({
            status : true , 
            data: Department
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
        res.status(500).json({
            status: 'error',
            message: 'Invalid request data',
        })
    }else {
        const Department = new departmenteModel()
        Department.name = data.name 
        Department.save().then((success)=>{
            res.json({
                status : true , 
                data: Department
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
        name : joi.string().required(),
    })
    const validate = joi.validate(data , schema)
    if (validate.error) {
        res.status(500).json({
            status: 'error',
            message: 'Invalid request data',
        })
    }else {
        departmenteModel.findById(id).then((Department)=>{
            Department.name = data.name 
            Department.save().then((success)=>{
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
    departmenteModel.findByIdAndDelete(id).then((result)=>{
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