const Brand = require('../../model/brand')
const helper = require('./utils/helper')


const createBrand = async (req, res) => {
  const brandName = req.body.name
  const brand = await Brand.create({
    name: brandName,
  })
  res.status(201).json({
    status: true,
    data: brand,
  })
}

const getAllBrand = async (req, res) => {
  const paginate = helper.pages(req.query.page)
  const allBrand = await Brand.aggregate([
    {
      $project: {
        product_id: 0,
      },
    },
    { $skip: paginate.skip },
    { $limit: paginate.limit },
  ])

  res.status(200).json({
    status: true,
    data: allBrand,
  })
}

const updateBrand = async (req, res) => {
  const brandID = req.params.id
  const brand = await Brand.findByIdAndUpdate(brandID, req.body.name, {
    new: true,
  })
  if (!brand) {
    return res.status(404).send('Brand to update not found!')
  }
  res.status(200).json({
    msg: 'Brand updated successfully',
    data: brand,
  })
}

const deleteBrand = async (req, res) => {
  const brand = await Brand.findOneAndDelete({ _id: req.params.id })
  if (!brand) {
    return res.status(404).send('Brand with this id not found!')
  }
  res.status(200).json({
    msg: 'Brand deleted successfully',
  })
}

module.exports = {
  createBrand,
  getAllBrand,
  updateBrand,
  deleteBrand
}
