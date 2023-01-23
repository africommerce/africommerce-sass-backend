// const Product = require('../../model/products')
const { default: mongoose } = require('mongoose')
const WishList = require('../../model/wishList')
const Product = require('../../model/products')
// const { userModel } = require('../../model/users')

const CreateWishList = async (req, res) => {
  const productId = req.body.product
  const user = req.user.id
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(404).json({
      msg: 'Invalid product id!',
    })
  }

  const productExist = await Product.findById(productId)
  if (!productExist) {
    return res.status(400).json({
      msg: 'Product with this id does not exist!',
    })
  }

  let userExist = await WishList.findOne({ user })
  if (userExist){
    userExist.products.push(productId)
    await userExist.save()
  }
  else {
    const newWishList = new WishList({
      user,
      products: productId
    })
    await newWishList.save()
    userExist = newWishList
  }
  res.status(201).json({
    msg: 'Wishlist created!',
    data: userExist
  })
}

const getWishLists = async (req, res) => {
  // const { id } = req.params // destructured the req.params.id and passed it to var
  const wishList = await WishList.find({ user: req.user.id }).populate(
    'products'
  )
  if (!wishList) {
    return res.status(404).json({
      msg: 'error, not wishlist found for this user!',
    })
  }
  res.status(200).json({
    data: wishList,
  })
}

const deleteWishList = async (req, res) => {
  const wishList = await WishList.findByIdAndRemove(req.params.id)
  if(!wishList){
    return res.status(404).json({
      msg: 'id does not exist!'
    })
  }

  res.status(200).json({ status: true, data: wishList })
}

module.exports = { CreateWishList, getWishLists, deleteWishList }
