const router = require('express').Router()

const bodyTypeController = require('../Controllers/bodyTypeController');
const isAuth = require('./../middleware/isAuth')

router.get('/', isAuth, bodyTypeController.getAll )
router.get('/:id', isAuth, bodyTypeController.getOne )
router.post('/', isAuth, bodyTypeController.Create )
router.post('/:id', isAuth, bodyTypeController.update )
router.delete('/:id', isAuth, bodyTypeController.delete )

module.exports = router