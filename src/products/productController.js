const Product = require('../../model/products')


const createProduct = async (req, res, next) => {
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
        owner_id: req.user.id,
        rating: req.body.rating,
        images: req.body.images,
    })

    /**
     * check for optional parameters and add to
     * product if present
     */
    if (req.body.product_details) {
        productToSave.product_details = req.body.product_details
    }

    if (req.body.warranty) {
        productToSave.warranty = req.body.warranty
    }

    /**
     * Save product
     */
    const savedProduct = await productToSave.save()

    /**
     * Send a response to the client
     */
    res.status(201).json({
        status: true,
        product: savedProduct,
    })
}

const getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({ nbHits: products.length, products })

}



const getProduct = async (req, res) => {
    const { id: productID } = req.params// destructured the req.params.id and passed it to var
    const product = await Product.findOne({ _id: productID })
    res.status(200).json({ product })

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

const TopProducts = async(req, res, next) =>{
    const products = await Product.aggregate([
      {
        // STAGE 1
        $addFields: {
          ratingSum: {
            $reduce: {
              input: "$ratings",
              initialValue: 0,
              in: {
                $add: ["$$value", "$$this.val"],
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
          ratings: 0,__v: 0,ratingSum: 0,
        },
      },

      { $limit: 5 },
    ]);

    return res.status(200).json({
      status: true,
      products,
    });
}

const productById = async (req, res, next, id) => {
    await Product.findById(id)
        .populate('category')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            req.product = product;
            next();
        });
  };
  
  
  const getRelatedProducts = async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  
    await Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
  };
  

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    TopProducts,
    productById,
    getRelatedProducts
}
