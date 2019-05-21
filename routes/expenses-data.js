const router = require('express').Router()

const expensesDataController = require('../Controllers/expensesDataController');
const isAuth = require('./../middleware/isAuth')

router.get('/', isAuth, expensesDataController.getAll )
router.get('/:id', isAuth, expensesDataController.getOne )
router.post('/', isAuth, expensesDataController.create )
router.post('/:id', isAuth, expensesDataController.update )
router.delete('/:id', isAuth, expensesDataController.delete )

module.exports = router