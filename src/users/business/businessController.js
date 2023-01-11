const { userModel, businessModel } = require('../../../model/users')

async function registerBusinessUser(req, res) {
  const { business_name, address, logo } = req.body
  const userId = req.user.id
  const { usertype } = await userModel.findById(userId)
  const userIsBusiness = usertype === 'business'
  if (userIsBusiness) {
    return res.status(400).send('You are a business user already!')
  }
  const businessUser = await businessModel.create({
    business_name,
    address,
    logo,
    owner: userId,
  })
  // update user
  await userModel.findByIdAndUpdate(
    userId,
    { usertype: 'business' },
    { new: true }
  )
  res.send(businessUser)
}

async function getBusinessUserInfo(req, res) {
  const user = await businessModel
    .findOne({ _id: req.params.id })
    .populate('owner')
  if (!user) {
    return res.status(404).send('User not found!')
  }
  res.status(200).json({
    msg: 'successful!',
    data: user,
  })
}

async function getAllBusinessUser(req, res) {
  const user = await businessModel.find({}).populate('owner')
  res.json({
    status: 200,
    data: user,
  })
}

async function updateBusinessInfo(req, res) {
  const business = await businessModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  if (!business) {
    return res.status(404).send('This business does not exist!')
  }
  res.status(200).json({
    msg: 'successful!',
    data: business,
  })
}

module.exports = {
  registerBusinessUser,
  getBusinessUserInfo,
  updateBusinessInfo,
  getAllBusinessUser,
}
