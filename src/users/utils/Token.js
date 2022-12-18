const crypto = require('crypto')
const verificationMail = require('./Emails/emailVerification')
require('dotenv').config()

const verificationToken = crypto.randomBytes(32).toString('hex')
const emailVerificationToken = crypto
  .createHash('sha256')
  .update(verificationToken)
  .digest('hex')
const emailVerificationExpires = Date.now() + 3 * 24 * 60 * 60 * 1000


const statusResponse = async (req, res, user) => {

  user.password = undefined
  user.emailVerificationToken = undefined
  user.emailVerificationExpires = undefined

  /*Handles sending out MAILS only in PRODUCTION*/
  if (process.env.NODE_ENV==='production'){
    try {

      /* creating verification link */
      const link = `${req.protocol}://${req.get(
        'host'
      )}/users/verify/${verificationToken}`

      await verificationMail({
        name: user.firstname,
        email: user.email,
        url: link,
      })

      return res.status(200).json({
        msg: 'Registration successful, please check your email!',
        user,
      })
    } catch (err) {
      (user.emailVerificationToken = undefined),
      (user.emailVerificationExpires = undefined)
      await user.save({ validateBeforeSave: false })

      return res.status(400).json({
        status: false,
        msg: 'There was an error sending the mail, Try again later!',
      })
    }
  }
  /*response while in DEVELOPMENT*/
  else{
    return res.status(200).json({
      msg: 'Registration successful!',
      user,
    })
  }



}

module.exports = { verificationToken, emailVerificationToken, emailVerificationExpires, statusResponse }