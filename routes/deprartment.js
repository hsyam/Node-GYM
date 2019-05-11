const router = require('express').Router()

const departmentController = require('../Controllers/departmentController');
const isAuth = require('./../middleware/isAuth')

router.get('/', isAuth, departmentController.getAll )
router.get('/:id', isAuth, departmentController.getOne )
router.post('/', isAuth, departmentController.Create )
router.post('/:id', isAuth, departmentController.update )
router.delete('/:id', isAuth, departmentController.delete )

module.exports = router