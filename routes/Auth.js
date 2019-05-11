const router = require('express').Router()

const AuthController = require('../Controllers/AuthController');

router.post('/login' , AuthController.login )
router.post('/register', AuthController.register)
router.post('/forgetpassword', AuthController.forgetPassword)
router.get('/restpassword/:id', AuthController.restPasswrod)
router.post('/restpassword/:id', AuthController.updatePassword )
module.exports = router