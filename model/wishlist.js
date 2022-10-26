const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//  WishList Schema

const wishListSchema = new Schema(
  {
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  } , 
  products: [{
     productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1
    },
    
  }]
})


const  wishList = mongoose.model("wishList", wishListSchema);
module.exports = wishList; //exporting the created model