const Product = require('../../model/products')
const Category = require("../../model/categories")
const { userModel } = require("../../model/users");

const CreateReview = async (req, res) => {
    const { id } = req.params// destructured the req.params.id and passed it to var
    const review = await Product.findOne({ _id: id })
    if(review){
        req.body.author = req.user._id
    review.reviews.push(req.body)

    await review.save()

    const newReview = await Product.findById(review._id).populate('reviews.author')
    
    res.status(200).json({ status: true, newReview })
    }else{
        res.status(404).json({ status: false, message: "Product not found" })
    }
  
  }

  const getReviews = async (req, res) => {
    const { id } = req.params// destructured the req.params.id and passed it to var
    const reviews = await Product.findOne({ _id: id }).populate('reviews.author')
    if(review){
    res.status(200).json({ status: true, reviews: reviews.reviews })
    }else{
        res.status(404).json({ status: false, message: "Product not found" })

    }
  }

  const updateReview = async (req, res) => {
    const review = await Product.findOne({ _id: req.params.id }).populate('reviews.author')
    if(review){
        if(req.body.rating){
            review.rating = req.body.rating
        }
        if(req.body.comment){
            review.comment = req.body.comment
        }

        await review.save()
        res.status(200).json({ status: true, reviews: review.reviews })

    }else{
        res.status(404).json({ status: false, message: "Product not found" })

    }
  }

  const deleteReview = async (req, res) => {
    const review = await Product.findByIdAndUpdate(req.params.id, {
        $pull: {
            reviews: { _id: req.params.reviewID }
        }
    }, {new:true})
    if(review){
        const updatedReview = Product.findById(req.params.id).populate('reviews.author')

        res.status(200).json({ status: true, reviews: updatedReview.reviews })

    }else{
        res.status(404).json({ status: false, message: "Product not found" })

    }
  }

module.exports = {CreateReview, getReviews, updateReview, deleteReview}