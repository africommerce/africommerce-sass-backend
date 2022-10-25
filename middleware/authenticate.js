var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var { userModel } = require("../model/users");
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
    try {
        const user = await userModel.findOne({ _id: req.user._id })
        console.log(user)
        if (user.usertype == 'business') {
            next()
        }
    } catch (err) {
        res.json({ status: false, err, message: 'you are not authorised' })
    }
}