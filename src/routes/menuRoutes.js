import { Router } from 'express';
import {
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
  createProduct,
} from '../controllers/productsControllers.js';
import { validateBody } from '../middleware/validateBody.js';
import { createProductSchema, updateProductSchema } from '../middleware/productValidator.js';

const router = Router();

router.get('/menu', getProducts);
router.get('/menu/:productId', getProductById);
router.post('/menu', validateBody(createProductSchema), createProduct);
router.patch('/menu/:productId', validateBody(updateProductSchema), updateProduct);
router.delete('/menu/:productId', deleteProductById);

export default router;
