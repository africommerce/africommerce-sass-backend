const Product = require('../../model/products')
// const Review = require('../../model/review')
const Category = require('../../model/categories')
const { userModel } = require('../../model/users')
const brandModel = require('../../model/brand')
const helper = require('./utils/helper')

const createProduct = async (req, res) => {
  let productToSave = {
    name: req.body.name,
    brand: req.body.brand,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    desc: req.body.desc,
    images: req.body.images,
    refundable: req.body.refundable,
    product_detail: req.body.product_detail,
    warranty: req.body.warranty,
  }
  const owner_id = req.user.id

  productToSave.owner_id = owner_id
  const categoryInstance = await Category.findOne({
    category_name: req.body.category,
  })
  if (!categoryInstance) {
    delete productToSave.category
  } else {
    productToSave.category = categoryInstance.id
  }

  const brandInstance = await brandModel.findOne({ name: productToSave.brand })
  if (!brandInstance) {
    delete productToSave.brand
  } else {
    productToSave.brand = brandInstance.id
  }

  const product = await Product.create(productToSave)
  res.status(201).json({
    msg: 'Product created successfully!',
    data: product,
  })
}

const getAllProducts = async (req, res) => {
  // NAME OF CATEGORY FIELD: VALUE
  // category_name: value => SINCE WE ARE QUERYING BASED ON THE CATEGORY NAME

  const category = req.query.category_name
    ? await Category.findOne({ category_name: req.query.category_name })
    : undefined
  const query = helper.buildQuery(req.query, category)
  const paginate = helper.pages(req.query.page)

  const products = await Product.find(query.query)
    .sort(query.sortBy)
    .skip(paginate.skip)
    .limit(paginate.limit)

  return res.status(200).json({ nbHits: products.length, data: products })
}

const getAllProductsByRating = async (req, res) => {
  const rating = req.query.rating

  const products = await Product.find({ rating: rating }).limit(10)

  if (products.length === 0) {
    return res.status(404).json({ status: false, msg: 'No products found!' })
  }
  return res.status(200).json({ nbHits: products.length, data: products })
}

const getProduct = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
    .populate('brand')
    .populate('category')
    .populate('owner_id')

  res.status(200).json({
    status: true,
    data: product,
  })
}

const updateProduct = async (req, res) => {
  const productID = req.params.id
  // const { name, price, quantity, desc } = req.body
  const data = req.body
  const product = await Product.findByIdAndUpdate(productID, data, {
    new: true,
  })
  if (!product) {
    return res.status(404).send('Product to update not found!')
  }
  res.status(200).json({ msg: 'product updated successfully', data: product })
}

const deleteProduct = async (req, res) => {
  const productID = req.params.id
  const product = await Product.findOneAndDelete({ _id: productID })
  if (!product) {
    return res.status(404).send('Product with this id not found!')
  }
  res.status(200).json({ msg: 'product deleted successfully' })
}

const TopProducts = async (req, res) => {
  const products = await Product.aggregate([
    {
      // STAGE 1
      $addFields: {
        ratingSum: {
          $reduce: {
            input: '$rating',
            initialValue: 0,
            in: {
              $add: ['$$value', '$$this.value'],
            },
          },
        },
      },
    },

    {
      //STAGE 2
      $addFields: {
        rating: {
          $cond: [
            { $eq: [{ $size: '$ratings' }, 0] },
            0,
            { $divide: ['$ratingSum', { $size: '$ratings' }] },
          ],
        },
      },
    },

    {
      //STAGE 3
      $sort: { rating: -1 },
    },

    {
      // STAGE 4
      $project: {
        ratings: 0,
        __v: 0,
        ratingSum: 0,
      },
    },

    { $limit: 5 },
  ])

  return res.status(200).json({
    status: true,
    data: products,
  })
}

const latestProduct = async (req, res) => {
  /*SORT PRODUCTS BY DATE */
  const latestProducts = await Product.find({})
    .sort({ createdAt: 'desc' })
    .limit(10)
  res.status(200).json({ status: true, data: latestProducts })
}

const bestSelling = async (req, res) => {
  /* SORT PRODUCT BY MOST SOLD */
  const bestSellingProduct = await Product.find({}).sort({
    amount_sold: 'desc',
  })

  res.status(200).json({
    status: true,
    data: bestSellingProduct,
  })
}

const bestSeller = async (req, res) => {
  const bestSeller = await userModel.aggregate([
    {
      // STAGE 1
      $match: {
        usertype: 'business',
      },
    },
    {
      // STAGE 2
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'owner_id',
        as: 'products',
      },
    },
    {
      // STAGE 3
      $addFields: {
        sellerProductsTotal: {
          $reduce: {
            input: '$products',
            initialValue: 0,
            in: {
              $add: ['$$value', '$$this.amount_sold'],
            },
          },
        },
      },
    },
    {
      //STAGE 4
      $addFields: {
        sellerProductsTotalAvg: {
          $cond: [
            { $eq: [{ $size: '$products' }, 0] },
            0,
            { $divide: ['$sellerProductsTotal', { $size: '$products' }] },
          ],
        },
      },
    },
    {
      //STAGE 5
      $sort: { sellerProductsTotalAvg: -1 },
    },
    {
      // STAGE 6
      $project: {
        products: 0,
        __v: 0,
        sellerProductsTotalAvg: 0,
        sellerProductsTotal: 0,
      },
    },
  ])

  res.status(200).json({ status: true, data: bestSeller })
}

const fiveRandomProducts = async (req, res) => {
  const limit = 5
  const productObj = await Product.find({})
  const page = helper.randomPages(productObj, limit)
  const skip = (page - 1) * limit

  const randomProducts = await Product.find({}).skip(skip).limit(limit)

  return res.status(200).json({
    status: true,
    nbHits: randomProducts.length,
    data: randomProducts,
  })
}

const fiveCategoriesAndProduct = async (req, res) => {
  const CategoriesAndProduct = await Product.find({
    $sample: { size: 5 },
  })
    .select('-_id -__v -createdAt -updatedAt')
    .populate('category', '-_id -__v')
  return res.status(200).json({
    status: true,
    data: CategoriesAndProduct,
  })
}

module.exports = {
  createProduct,
  getAllProducts,
  getAllProductsByRating,
  getProduct,
  updateProduct,
  deleteProduct,
  TopProducts,
  latestProduct,
  bestSelling,
  bestSeller,
  fiveRandomProducts,
  fiveCategoriesAndProduct,
}
