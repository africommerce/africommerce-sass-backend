var passport = require('passport');
var { userModel } = require("../model/users");
var Product = require("../model/products")
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('../config/config');

exports.getToken = function (user) {
    return jwt.sign(user, config.jwtSecret,
        { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        userModel.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', { session: false });

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
    if (user.usertype == 'business') {
        return next()
    }
    return res.status(404).json({
        msg: "You are not a business",
        status: false
    })
}

exports.verifyAuthor = async (req, res, next) => {
    const product = await Product.findById(req.params.product).populate('author')
    if (!article) {
        res.status(403).json({ msg: 'Id not available' })
        return;
    }
    let userRequesting = req.user._id.toString()
    let articleAuthor = article.author._id.toString()

    if (userRequesting == articleAuthor) {
        next()
    }
    else {
        res.status(403).json({ msg: 'You are not authorised to update this blog' })
    }
}