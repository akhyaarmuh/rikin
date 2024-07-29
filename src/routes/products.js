import { Router } from 'express';

import validator from '../middlewares/validator.js';
import {
  createProduct,
  getAllProduct,
  getAllProductForSales,
  getProductByCode,
  updateProductById,
  updateProductCodeById,
  updateProductPriceById,
  updateProductStockById,
  deleteProductById,
} from '../controllers/products.js';
import verifyRole from '../middlewares/verify-role.js';
import verifyAccesToken from '../middlewares/verify-access-token.js';
import verifyRefreshToken from '../middlewares/verify-refresh-token.js';

const router = Router();

router.post(
  '/',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('createProduct'),
  createProduct
);
router.get('/', verifyRefreshToken, getAllProduct);
router.get('/for-sale', verifyRefreshToken, getAllProductForSales);
router.get('/:code/code', verifyRefreshToken, getProductByCode);
router.patch(
  '/:id',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('updateProduct'),
  updateProductById
);
router.patch(
  '/:id/code',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('updateProductCode'),
  updateProductCodeById
);
router.patch(
  '/:id/price',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('updateProductPrice'),
  updateProductPriceById
);
router.patch(
  '/:id/stock',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('updateProductStock'),
  updateProductStockById
);
router.delete(
  '/:id',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  deleteProductById
);

export default router;
