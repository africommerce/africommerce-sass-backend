const router = require("express").Router()
const authenticate = require('../../../middleware/authenticate')

const {
    registerBusinessUser,
    getBusinessUserInfo,
    updateBusinessInfo,
    getAllBusinessUser
} = require('./businessController')

router
    .route('/signup')
    .post(authenticate.verifyUser, registerBusinessUser)


router
    .route('/')
    .get(getAllBusinessUser)

router
    .route('/:id')
    .get(authenticate.verifyUser, getBusinessUserInfo)

router
    .route('/:id')
    .put(updateBusinessInfo)

module.exports = router