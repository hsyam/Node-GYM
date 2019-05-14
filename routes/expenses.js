const router = require('express').Router()

const expensesController = require('../Controllers/expensesController');
const isAuth = require('./../middleware/isAuth')

router.get('/', isAuth, expensesController.getAll )
router.get('/:id', isAuth, expensesController.getOne )
router.post('/', isAuth, expensesController.Create )
router.post('/:id', isAuth, expensesController.update )
router.delete('/:id', isAuth, expensesController.delete )

module.exports = router