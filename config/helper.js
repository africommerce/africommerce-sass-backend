const argon2 = require('argon2')
// const jwt = require('jsonwebtoken')
// const config = require('./config')

const userModel = require('../model/users')

async function hashPassword(password) {
  return await argon2.hash(password)
}

async function verifyPassword(plainPassword, hashedPassword) {
  return await argon2.verify(hashedPassword, plainPassword)
}

async function validateUser(idenity, password) {
  let user = await userModel.findOne({ username: idenity }).select('+password')
  if (!user) {
    user = await userModel.findOne({ email: idenity }).select('+password')
  }
  if (!user) {
    return false
  }
  const verifyPassword = await argon2.verify(user.password, password)
  if (!verifyPassword) {
    return false
  }
  return user
}

module.exports = {
  hashPassword,
  verifyPassword,
  validateUser,
}
