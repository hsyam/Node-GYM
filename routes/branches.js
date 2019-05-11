const router = require('express').Router()

const branchesController = require('../Controllers/branchesController');
const isAuth = require('./../middleware/isAuth')

router.get('/' , isAuth , branchesController.getAll )
router.get('/:id' , isAuth ,  branchesController.getOne )
router.post('/', isAuth , branchesController.Create )
router.post('/:id', isAuth , branchesController.update )
router.delete('/:id', isAuth ,  branchesController.delete )

module.exports = router