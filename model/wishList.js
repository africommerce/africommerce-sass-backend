const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wishListSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'dish'
    }]
},{
    timestamps : true
});

module.exports = mongoose.model('wishList', wishListSchema)