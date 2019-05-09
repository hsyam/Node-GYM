const jwt = require('jsonwebtoken')
const User = require('./../Models/user')


module.exports = (req , res , next)=>{
    let statusCode = 401 
   let Invalid = {
    status : false , 
    message : "Invalid token"
    }

    let header = req.get('Authorization')
    if(!header) {
        return res.status(statusCode).json({
            status : false , 
            message : "Header Not provide"
        })
    }else {
        let token = header.split(' ')[1]
        try{
            decoded = jwt.verify(token , 'GymAppSecretKeyHash00')
        }catch(e){
            return res.status(statusCode).json(Invalid)
        }

        if(!decoded){
            return res.status(statusCode).json(Invalid)
        }
        
            let user = User.findById(decoded.id).then((res)=>{
            req.user = res
            next()
        }).catch((err)=>{
            return  res.status(statusCode).json(Invalid)
        })
    }
}