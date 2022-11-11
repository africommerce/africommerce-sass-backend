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
    .get(getBusinessUserInfo)

router
    .route('/:id')
    .put(authenticate.verifyUser, authenticate.verifyAuthor, updateBusinessInfo)

module.exports = router