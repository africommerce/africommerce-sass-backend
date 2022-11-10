const Product = require('../../model/products')
const Category = require("../../model/categories")
const { userModel } = require("../../model/users");
const helper = require('./utils/helper')


const createProduct = async (req, res) => {
  /**
   * create new product with required parameters
   */
  const productToSave = new Product({
    name: req.body.name,
    brand_name: req.body.brand_name,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    desc: req.body.desc,
    images: req.body.images,
    owner_id: req.user.id
  })


  if (req.body.product_details) {
    productToSave.product_details = req.body.product_details
  }

  if (req.body.warranty) {
    productToSave.warranty = req.body.warranty
  }

  const category = await Category.findOne({ category_name: req.body.category })
  if (!category) {
    productToSave.category = null
  }
  productToSave.category = category.id


  const savedProduct = await productToSave.save()
  res.status(201).send(savedProduct)
}

const getAllProducts = async (req, res) => {
  try {

    // NAME OF CATEGORY FIELD: VALUE
    // category_name: value => SINCE WE ARE QUERYING BASED ON THE CATEGORY NAME

    const category = req.query.category_name
      ? await Category.findOne({ category_name: req.query.category_name })
      : undefined;
    const query = helper.buildQuery(req.query, category);
    const paginate = helper.pages(req.query.page);

    const products = await Product
      .find(query)
      .skip(paginate.skip)
      .limit(paginate.limit);

    return res.status(200).json({ nbHits: products.length, products: products });
  }
  catch (err) {
    return res.status(400).json({ status: false, error: err })
  }
}



const getProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ id: productID });

  const productCategory = product.category;
  const relatedProducts = await Product
    .find({ category: productCategory, _id: { $ne: productID } })
    .limit(10)

  res.status(200).json({
    status: true,
    product: product,
    relatedProducts: relatedProducts,
  });

}

const updateProduct = async (req, res) => {
  const productID = req.params.id
  const { name, price, quantity, desc } = req.body
  const product = await Product.findByIdAndUpdate(productID, req.body, { new: true })
  if (!product) {
    return res.status(404).send("Product to update not found!")
  }
  res.status(200).json({ msg: 'product updated successfully', product })


}

const deleteProduct = async (req, res) => {
  const productID = req.params.id
  const product = await Product.findOneAndDelete({ _id: productID })
  if (!product) {
    return res.status(404).send("Product with this id not found!")
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
            input: "$ratings",
            initialValue: 0,
            in: {
              $add: ["$$value", "$$this.value"],
            },
          },
        },
      },
    },

    {//STAGE 2
      $addFields: {
        rating: {
          $cond: [
            { $eq: [{ $size: "$ratings" }, 0] },
            0,
            { $divide: ["$ratingSum", { $size: "$ratings" }] },
          ],
        },
      },
    },

    {//STAGE 3
      $sort: { rating: -1 },
    },

    {// STAGE 4
      $project: {
        ratings: 0, __v: 0, ratingSum: 0,
      },
    },

    { $limit: 5 },
  ]);

  return res.status(200).json({
    status: true,
    products,
  });
}


const latestProduct = async (req, res) => {
  /*SORT PRODUCTS BY DATE */
  const latestProducts = await Product.find({})
    .sort({ createdAt: "desc" })
    .limit(10);
  res.status(200).json({ status: true, latestProducts: latestProducts });

}


const bestSelling = async (req, res) => {

  /* SORT PRODUCT BY MOST SOLD */
  const bestSellingProduct = await Product.find({}).sort({ amount_sold: "desc" })

  res.status(200).json({
    status: true,
    bestSellingProducts: bestSellingProduct
  })
}

const bestSeller = async (req, res) => {
  const bestSeller = await userModel.aggregate([
    {
      // STAGE 1
      $match: {
        usertype: "business",
      },
    },
    {
      // STAGE 2
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "owner_id",
        as: "products",
      },
    },
    {
      // STAGE 3
      $addFields: {
        sellerProductsTotal: {
          $reduce: {
            input: "$products",
            initialValue: 0,
            in: {
              $add: ["$$value", "$$this.amount_sold"],
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
            { $eq: [{ $size: "$products" }, 0] },
            0,
            { $divide: ["$sellerProductsTotal", { $size: "$products" }] },
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
        sellerProductsTotal: 0
      },
    },
  ]);

  res.status(200).json({ status: true, bestSeller: bestSeller })
}

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  TopProducts,
  latestProduct,
  bestSelling,
  bestSeller

}
