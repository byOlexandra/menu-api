import { Router } from 'express';
import {
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
  createProduct,
} from '../controllers/productsControllers.js';

const router = Router();

router.get('/menu', getProducts);
router.get('/menu/:productId', getProductById);
router.post('/menu', createProduct);
router.patch('/menu/:productId', updateProduct);
router.delete('/menu/:productId', deleteProductById);

export default router;
