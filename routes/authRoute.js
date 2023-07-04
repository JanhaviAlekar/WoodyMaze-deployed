import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { testController, registerController, loginController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from "../controllers/authController.js";
//router object
const router = express.Router();

// routing
// register || method post
router.post('/register', registerController);

//login || post
router.post('/login', loginController);

//password reset || post
router.post('/forgot-password', forgotPasswordController)
//test route
router.get('/test', requireSignIn, isAdmin, testController);

//protected user route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//protected admin route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put('/profile', requireSignIn, updateProfileController)

//orders controller
router.get('/orders', requireSignIn, getOrdersController)

//all orders controller
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

//order status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)

export default router;