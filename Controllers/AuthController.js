const User = require('../Models/user')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const nodemailer = require('nodemailer')
const pug = require('pug')
const crypto = require("crypto");
const _ = require('lodash')

smtpMailer = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "36921a8e4b675c",
        pass: "46c18a1531e221"
    }
});



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

exports.register = async(req , res , next)=>{
    
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
        validate.error.statusCode = 422
        validate.error.message = "Invalid request data"
        next(validate.error)
    }else {
        let _user = await User.findOne({email: data.email})
        if(_user){
            res.status(422).json({
                status: false ,  
                message: "Email is already exists"
            })
            return
        }
        data.password = await bcrypt.hashSync(data.password ,10) 
        let info = _.pick(data , ['name' , 'username' , 'email' , 'password' , 'phone' , 'department_id' , 'branch_id' , 'role'  ])
        let newUser = new User(info)
        newUser.save().then(susscess=>{
            res.status(200).json({'status' : true , message :"User Created " , data : newUser}) 
        }).catch(err=>{
            err.statusCode = 422
            err.message = "cant Create user"
            next(err)
        })
        
    
    }


}

exports.forgetPassword = async (req , res , next)=>{
    const email = req.body.email
    const FilePath = path.join(__dirname, '../', 'public', 'static', 'mail', 'ForgetPassword.pug')   
    const template = pug.compileFile(FilePath)

    const restToken = crypto.randomBytes(20).toString('hex')
    const resetlink = req.protocol + '://' + req.get('host') + '/auth/restpassword/' + restToken
    const HtmlMail = template({ resetlink: resetlink});

    User.findOne({email : email}).then((user)=>{
        if(user.length != 0){
            
            user.resetToken = restToken
            
            user.save().then((success)=>{
                
                let mailOptions = {
                    from: 'admin@gym-back-end.com',
                    to: user.email,
                    subject: 'Rest Password',
                    html: HtmlMail
                }

                smtpMailer.sendMail(mailOptions , (err , response)=>{
                    if(err){
                        return res.status(404).json({
                            status: false,
                            message: 'Email Not Sent ',
                        })
                    }else {
                        return res.json({
                            status: true,
                            message: 'Email Sent',
                        })   
                    }
                })

            }).catch((err)=>{
                console.log(err);
                
            })
            
        }else {
            return res.status(404).json({
                status: false,
                message: 'Email Not found ',
            })
        }
        
    }).catch((err)=>{

        err.message = "email Not Found"
        next(err)  
        
    })

}


exports.restPasswrod = (req, res) => {
    res.render('home', { restlink : "hassan"})
}

exports.updatePassword = async (req, res) => {
    id = req.params.id
    password = bcrypt.hashSync(req.body.password ,10)
    await User.findOne({ resetToken: id }).then((user)=>{        
        user.password = password 
        user.save().then((susscess)=>{
            res.render('passwordUpdated')
        }).catch((err) => {
            res.status(404).render('404')
        })
    }).catch((err)=>{
        res.status(404).render('404')
    })
    
}