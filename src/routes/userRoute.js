const route = require('express').Router()
const userControllers = require('../controllers/userController')

route.post('/', userControllers.create)

module.exports = route