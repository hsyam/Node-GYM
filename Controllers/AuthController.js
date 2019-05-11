const User = require('../Models/user')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const nodemailer = require('nodemailer')
const pug = require('pug')
const crypto = require("crypto");

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

exports.forgetPassword = async (req , res)=>{
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

        throw err 
        
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