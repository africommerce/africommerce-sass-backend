const Category = require('../../model/categories')
const random = require('./utils/random')

exports.createCategory = async (req, res) => {
  try {
    const newCategory = req.body.name

    const savedCategory = await Category.create({
      category_name: newCategory,
    })

    return res.status(201).json({
      status: true,
      category: savedCategory,
    })
  } catch (err) {
    return res.status(400).json({ status: false, error: err })
  }
}

exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.aggregate([
      {
        $project: {
          product_id: 0,
        },
      },
    ])

    res.status(200).json({
      status: true,
      categories: allCategories,
    })
  } catch (err) {
    res.status(400).json({
      status: false,
      err,
    })
  }
}

exports.fiveRandomCategories = async (req, res) => {
  try {
    const limit = 5
    const categoryObj = await Category.find({})
    const page = random.randomPages(categoryObj, limit)
    const skip = (page - 1) * limit

    const randomCategories = await Category.find({}).skip(skip).limit(limit)

    return res.status(200).json({ status: true, categories: randomCategories })
  } catch (err) {
    return res.status(400).json({ status: false, error: err })
  }
}
