import User from '../models/UserSchema.js'

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

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
}