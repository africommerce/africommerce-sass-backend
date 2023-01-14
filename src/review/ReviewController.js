const Review = require('../../model/review')
const Product = require('../../model/products')

const CreateReview = async (req, res) => {
  const { rating, comment, product_id } = req.body
  const owner_id = req.user.id
  const product = await Product.findById(product_id)
  if (!product) {
    return res.status(400).send('Product to review not found!')
  }
  const review = await Review.create({
    rating,
    comment,
    product: product_id,
    owner_id,
  })

  const avgRating = await Review.aggregate([
    {
      $match: {
        product: product._id,
      },
    },
    {
      $group: {
        _id: '$product',
        count: { $sum: 1 },
        avg: { $avg: '$rating' },
      },
    },
  ])

  product.rating = avgRating[0].avg
  await product.save()
  res.status(200).json({
    msg: 'Review created successfully!',
    review,
  })
}

const getAllReview = async (req, res) => {
  const reviews = await Review.find()
  res.json({
    reviews,
  })
}

const getReview = async (req, res) => {
  const review = await Review.findById(req.params.id)
  if (!review) {
    return res.status(404).send('Review with this id not found!')
  }
  res.json({
    review,
  })
}

const updateReview = async (req, res) => {
  const { rating, comment } = req.body
  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { rating, comment },
    { new: true }
  )
  if (!review) {
    return res.send('Review to update not found!')
  }
  res.json({
    msg: 'Review update successfully!',
    review,
  })
}

const deleteReview = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id)
  if (!review) {
    return res.send('Review to delete not found!')
  }
  res.send('Review deleted successfully!')
}

module.exports = {
  CreateReview,
  getReview,
  updateReview,
  deleteReview,
  getAllReview,
}
