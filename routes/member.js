const router = require('express').Router()

const memberController = require('../Controllers/memberController');
const isAuth = require('./../middleware/isAuth')

router.get('/', isAuth, memberController.getAll )
router.get('/:id', isAuth, memberController.getOne )
router.post('/', isAuth, memberController.create )
router.post('/:id', isAuth, memberController.update )
router.delete('/:id', isAuth, memberController.delete )

module.exports = router