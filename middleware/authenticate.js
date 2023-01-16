const passport = require('passport')
const userModel = require('../model/users')
const businessModel = require('../model/buiness')
const Product = require('../model/products')
const JwtStrategy = require('passport-jwt').Strategy
const jwt = require('jsonwebtoken')

const config = require('../config/config')

const cookieExtractor = function (req) {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['jwt_token']
  }
  return token
}

exports.getToken = function (user) {
  return jwt.sign(user, config.jwtSecret, { expiresIn: 3600 })
}

const opts = {}
opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = config.jwtSecret

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    userModel.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false)
      } else if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  })
)

exports.verifyUser = passport.authenticate('jwt', { session: false })

exports.verifyAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id })
    if (user.admin) {
      next()
    }
  } catch (err) {
    res.json({ status: false, err, message: 'you are not authorised' })
  }
}

exports.verifyUserType = async (req, res, next) => {
  const user = await userModel.findOne({ _id: req.user._id })
  if (user.usertype === 'business') {
    return next()
  }
  return res.status(404).json({
    msg: 'You are not a business',
    status: false,
  })
}

exports.verifyAuthor = async (req, res, next) => {
  const product = await Product.findById(req.params.product).populate('author')
  if (!product) {
    res.status(403).json({ msg: 'Id not available' })
    return
  }
  let userRequesting = req.user._id.toString()
  let productOwner = product.owner_id.toString()

  if (userRequesting === productOwner) {
    next()
  } else {
    res.status(403).json({ msg: 'You are not authorised to update this product' })
  }
}

exports.verifyBusinessOwner = async (req, res, next) => {
  const business = await businessModel.findById(req.params.id)
  if (!business) {
    return res.status(404).json({
      msg: 'This business does not exist!',
    })
  }
  const access = business.owner[0].toString() === req.user._id.toString() ? true : false
  if (access) return next()

  return res.status(403).json({
    msg: 'You are not authorised to update this business',
  })
}
