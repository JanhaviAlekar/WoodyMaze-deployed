import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSimilarProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable"
const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//delete product
router.post('/product/:pid', deleteProductController)

//get product
router.get('/get-product', getProductController)

// get single product
router.get('/get-product/:slug', getSingleProductController)

// get photo product
router.get('/product-photo/:pid', productPhotoController)

//deleter
router.delete('/delete-product/:pid', deleteProductController)

//product filter
router.post('/product-filter', productFilterController)

//product count
router.get('/product-count', productCountController)

//product list count
router.get('/product-list/:page', productListController)

//search prodcut
router.get('/search/:keywords', searchProductController)

//get similar products
router.get('/related-product/:pid/:cid', getSimilarProductController)

//get products by category
router.get('/product-category/:slug', productCategoryController)

//payment route 
//token
router.get('/braintree/token', braintreeTokenController);

//paymenst
router.post('/braintree/payment', requireSignIn, braintreePaymentController)

export default router;