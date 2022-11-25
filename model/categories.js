const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  category_name: {
    type: String,
    unique: true,
    required: [true, 'Category name is required!'],
  }
})

const Category = mongoose.model('category', CategorySchema)
module.exports = Category
