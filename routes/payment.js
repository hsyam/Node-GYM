const router = require('express').Router()

const paymentController = require('../Controllers/paymentController');
const isAuth = require('./../middleware/isAuth')

router.get('/', isAuth, paymentController.getAll )
router.get('/:id', isAuth, paymentController.getOne )
router.post('/', isAuth, paymentController.Create )
router.post('/:id', isAuth, paymentController.update )
router.delete('/:id', isAuth, paymentController.delete )

module.exports = router