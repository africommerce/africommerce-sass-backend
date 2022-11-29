const mongoose = require('mongoose')
const ObjectId = mongoose.isValidObjectId

async function paramIsValidId(req, res, next) {
  if (ObjectId(req.params.id)) {
    return next()
  }
  res.status(406).json({
    msg: `Invalid param value ${req.params.id}`,
  })
}

module.exports = {
  paramIsValidId
}
