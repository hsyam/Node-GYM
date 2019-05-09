const User = require('../Models/user')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.login = (req , res)=>{
    data = req.body
    const schema = joi.object().keys({
        email : joi.string().email().required(),
        password : joi.required(),
    })

    const validate = joi.validate(data , schema)
    if(validate.error){
        res.json({
            status: 'error',
            message: 'Invalid request data',
        })
    }else { 

        user = User.findOne({email:data.email}).then(user =>{
            if(!user){
              return   res.json({
                    status: 'error',
                    message: 'Invalid Email',
                })
            }else {
                  bcrypt.compare(data.password , user.password).then(mathing=>{
                    if(mathing){
                        const payload = {
                            id : user._id , 
                            name : user.username
                        }
                    jwt.sign(payload, "GymAppSecretKeyHash00" , { expiresIn: 999999999} ,(err, token)=>{
                        if(err) 
                        res.status(500).json({ error: "Error signing token" });
                        return res.json({
                            status : true , 
                            token : token ,
                            user : user
                        })
                    })
                }
                else {
                    return   res.json({
                        status: false,
                        message: 'Invalid Password',
                    })
                }
            })


            }

            
          
           
        })
    }
}

exports.register = (req , res)=>{
    
    data = req.body
    const schema = joi.object().keys({
        name : joi.string().required(),
        username : joi.string().required(),
        email : joi.string().email().required(),
        password : joi.required(),
        phone : joi.required(),
        department_id : joi.required(),
        branch_id : joi.required(),
        role : joi.required(),
    })

    const validate = joi.validate(data , schema)
    if(validate.error){
        res.json({
            status: 'error',
            message: 'Invalid request data',
        })
    }else {

 

        let newUser = new User()
        newUser.name = data.name 
        newUser.username = data.username 
        newUser.email = data.email 
        newUser.password = bcrypt.hashSync(data.password ,10) 
        newUser.phone = data.phone 
        newUser.department_id = data.department_id 
        newUser.branch_id = data.branch_id 
        newUser.role = data.role
        newUser.save().then(susscess=>{
            res.status(200).json({'status' : true , message :"User Created " , data : newUser}) 
        }).catch(err=>{
            res.status(422).json({'status' : false , message :"Cant Create User"})

        })
        
    
    }


}