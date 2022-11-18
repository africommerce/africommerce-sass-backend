// const Product = require('../../model/products')
const WishList = require('../../model/wishList')
// const { userModel } = require('../../model/users')

const CreateWishList = async (req, res) => {
  const wishList = await WishList.create(req.body)

  const newWishList = await WishList.findById(wishList._id).populate('user')

  res.status(200).json({ status: true, newWishList })
}

const getWishLists = async (req, res) => {
  // const { id } = req.params // destructured the req.params.id and passed it to var
  const wishList = await WishList.findOne({ user: req.user._id })
    .populate('user')
    .populate('products')
  if (wishList) {
    res.status(200).json({ status: true, wishList })
  } else {
    res.status(404).json({ status: false, message: 'Product not found' })
  }
}

const deleteWishList = async (req, res) => {
  const wishList = await WishList.findByIdAndRemove(req.params.id)

  res.status(200).json({ status: true, wishList })
}

module.exports = { CreateWishList, getWishLists, deleteWishList }
