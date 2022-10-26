const express = require("express");

const wishlistRoute = express.Router();

const wishListController = require("./wishListController")

const authenticate = require('../../middleware/authenticate')




wishlistRoute
    .route("/")
    .post(authenticate.verifyUser, wishListController.addProductToWishList)
    .get(wishListController.getWishList);


wishlistRoute
    .route('/:id')
    .delete(authenticate.verifyUser, wishListController.deleteWishList)    


module.exports = wishlistRoute   
