import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { categoryController, updateCategoryController, getCategoryController, singleCategoryController, deleteCategoryController } from "../controllers/categoryController.js";
const router = express.Router();

//creating category
router.post('/create-category', requireSignIn, isAdmin, categoryController)

//updating category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

//get all category
router.get('/get-category', getCategoryController)

//single category
router.get('/single-category/:slug', singleCategoryController);

//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router;