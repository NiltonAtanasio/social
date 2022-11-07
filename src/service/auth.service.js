import User from '../models/User.schema.js'

const loginService = (email) => User.findOne({ email: email }).select("+password")

export  { loginService }