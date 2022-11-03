const route = require('express').Router()
const userControllers = require('../controllers/userController')
const { validId, validUser } = require('../middlewares/golbal.middlewares')

route.post('/', userControllers.create)
route.get('/', userControllers.findAll)
route.get('/:id', validId, validUser, userControllers.findById)
route.patch('/:id', validId, validUser, userControllers.update)

module.exports = route