const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const brandModel = mongoose.model('Brand', brandSchema)
module.exports = brandModel
