
const mongoose = require('mongoose')

const businessUser = new mongoose.Schema(
  {
    business_name: {
      type: String,
      required: [true, 'You must provide a buisness name'],
      // unique: [true, "This name already exist!"],
    },
    address: [
      {
        country: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        street_address: {
          type: String,
          required: true,
        },
      },
    ],
    logo: {
      type: String,
      required: [true, 'You must provide a logo for your brand!'],
    },
    owner:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
  },
  { timestamps: true }
)

const businessModel = mongoose.model('Business', businessUser)

module.exports = businessModel
