// importing the mongoose database ORM
const mongoose = require('mongoose')
const argon2 = require('argon2')

const Schema = mongoose.Schema

// modelling the User schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      default: '',
      required: true,
      select: false,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    email_is_confirmed: {
      type: Boolean,
      default: false
    },
    phonenumber: {
      type: String,
      default: '',
      required: true,
    },
    address: {
      type: String,
      default: '',
    },
    usertype: {
      type: String,
      enum: ['business', 'user'],
      default: 'user',
    },
    admin: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: String,
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
)



UserSchema.pre('save', async function () {
  const hash = await argon2.hash(this.password, 10)

  this.password = hash
})


const userModel = mongoose.model('User', UserSchema)

module.exports = userModel
