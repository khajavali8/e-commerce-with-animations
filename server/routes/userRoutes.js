import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/getproducts', userController.getAllProducts);
router.get("/getproducts/type/:type", userController.getProductsByType);

router.post('/register', userController.register);
router.post('/login',userController.login);
router.get('/logout',userController.logout);


export default router; 