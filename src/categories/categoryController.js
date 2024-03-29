const Category = require('../../model/categories')
const random = require('./utils/random')

const createCategory = async (req, res) => {
  try {
    const newCategory = req.body.name

    const savedCategory = await Category.create({
      category_name: newCategory,
    })

    return res.status(201).json({
      status: true,
      data: savedCategory,
    })
  } catch (err) {
    return res.status(400).json({ status: false, error: err })
  }
}

const getAllCategories = async (req, res) => {
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
      data: allCategories,
    })
  } catch (err) {
    res.status(400).json({
      status: false,
      err,
    })
  }
}

const fiveRandomCategories = async (req, res) => {
  try {
    const limit = 5
    const categoryObj = await Category.find({})
    const page = random.randomPages(categoryObj, limit)
    const skip = (page - 1) * limit

    const randomCategories = await Category.find({}).skip(skip).limit(limit)

    return res.status(200).json({ status: true, data: randomCategories })
  } catch (err) {
    return res.status(400).json({ status: false, error: err })
  }
}



module.exports = {
  createCategory,
  getAllCategories,
  fiveRandomCategories,
}