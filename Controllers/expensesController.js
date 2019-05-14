const ExpenseModel = require('./../Models/expense')
const joi = require('joi')
exports.getAll = async (req , res)=>{
    let expenses = await ExpenseModel.find({}).then((data)=>{
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
    let ecpenses = await ExpenseModel.findById(id).then((data)=>{
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
        let MyExpense = await new ExpenseModel(data)
        MyExpense.save().then((data)=>{
            res.json({
                status: true , 
                message: "Expense Add successfully",
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
        await ExpenseModel.findById(id).then((expense)=>{
            expense.name = data.name
            expense.save().then((success)=>{
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
    ExpenseModel.findByIdAndDelete(id).then((result)=>{
        if(result){
            res.json({
                status: true,
                message: "Sussess Deleted"
            })
        }
        res.status(404).json({
            status: false,
            message: "Entity Not Found"
        })
    }).catch((err)=>{
        res.status(500).json({
            status: false,
            message: "Cant Deleted"
        })
    })
}