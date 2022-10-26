const wishListModel = require('../../model/wishlist');
const Products = require('../../model/products');




// Get Wishlist Items
exports.getWishList = async (req, res) => {
    try {
        const allwishlist = await wishListModel.aggregate([
            {
              $project:{
                  owner: 0
              }
            },
          ]);
      
          res.status(200).json({
              status: true,
              wishlist: allwishlist
          })
    } catch (error) {
        res.status(500).json({
            status: false,
            error
        })
    }
    
};

// Add product to wishlist
exports.addProductToWishList = async(req, res) => {
    const owner = req.user._id;
    const {productId, quantity} = req.body;

    try {
        const cart = await wishListModel.findOne({owner})
        const product = await Products.findOne({_id: productId});

        if (!product){
            return res.status(404).send({message: "Product not found"})
        }
        const name = product.name
        const price = product.price

        if(!cart) {
            const newCart = await wishListModel.create({
                        owner,
                        products: [{productId, name, quantity, price}]
                    })
                    return res.status(201).json({
                        status: true,
                        data: newCart
                    })
        }

        if (cart) {
            const productIndex = cart.products.findIndex((prodt) => prodt.productId == productId)
            if (productIndex != -1){
                let product = cart.products[productIndex]
                product.quantity = quantity
                cart.products[productIndex] = product
                await cart.save();
                return res.status(201).send(cart)
                
            }
        }

    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

// delete wishlist
exports.deleteWishList = async (req, res) => {
    const owner = req.user._id;
    const productId = req.query.productId;

    try {
        const wishList = await wishListModel.findOne({owner});
        const prdtIndex = wishList.products.findIndex((prdt) => prdt.productId === productId);

        if (prdtIindex != 1){
            let prdt = wishList.products[prdtIndex]
            wishList.products.splice(prdtIndex, 1);

            wishList = await wishList.save();
            res.status(201).json({
                status: true,
                data: wishList
            });

        } else {
            res.status(404).send("Product not found")
        }
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}