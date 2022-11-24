const Brand = require('../../model/brand')
const helper = require('./utils/helper')

<<<<<<< HEAD


exports.createBrand = async (req, res) => {
    try {
        const brandName = req.body.name
        const brand = Brand.create({
            name: brandName
        })
        re.status(200).json({
            status: true,
            brand: brand
        })
    } catch (error) {
        return res.status(400).json({ 
            status: false, 
            error: error
         })
    }
}

exports.getAllBrand = async (req, res) => {
    try {
        const paginate = helper.pages(req.query.page)
        const allBrand = await Brand.aggregate([
            {
              $project: {
                product_id: 0,
              },
            },
            {'$skip': paginate.skip},
            {'$limit': paginate.limit},
          ])
      
          res.status(200).json({
            status: true,
            brand: allBrand,
          })
        } catch (err) {
          res.status(400).json({
            status: false,
            error,
          })
        }
}


exports.updateBrand = async (req, res) => {
    try {
        const brandID = req.params.id
        const brand = await Brand.findByIdAndUpdate(brandID, req.body, {
            new: true,
          })
        if (!brand) {
            return res.status(404).send('Brand to update not found!')
        }
        res.status(200).json({ 
            msg: 'Brand updated successfully', 
            brand 
        })  
    } catch (error) {
        res.status(400).json({
            status: false,
            error,
          })
    }
}

exports.deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findByIdAndDelete({ _id: req.params.id })
        if (!brand) {
            return res.status(404).send('Brand with this id not found!')
        }
         res.status(200).json({ 
            msg: 'Brand deleted successfully' 
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            error,
          })
    }
}
=======
const createBrand = async (req, res) => {
  const brandName = req.body.name
  const brand = await Brand.create({
    name: brandName,
  })
  res.status(200).json({
    status: true,
    brand,
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
    brand: allBrand,
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
    brand,
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
  deleteBrand,
}
>>>>>>> 9269dfe3035a0523937cb27d9a7207d231fe47df
