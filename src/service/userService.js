const User = require('../models/UserSchema')

const createService = (body) => User.create(body)

const findAllService = () => User.find()

const findByIdService = (id) => User.findById(id)

const updateService = (
    id, 
    name, 
    username, 
    email, 
    password, 
    avatar, 
    background
) => User.findOneAndUpdate(
  {_id: id},
  {id, name, username, email, password, avatar, background})

module.exports = {
  createService,
  findAllService,
  findByIdService,
  updateService,
}