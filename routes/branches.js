const router = require('express').Router()

const branchesController = require('../Controllers/branchesController');
const isAuth = require('./../middleware/isAuth')

router.get('/' , isAuth , branchesController.getAll )
router.get('/:id' , isAuth,  branchesController.getOne )
router.post('/' , branchesController.Create )
// router.post('/:id' , branchesController.register )
// router.delete('/:id' , branchesController.register )
module.exports = router