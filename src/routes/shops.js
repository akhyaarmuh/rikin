import { Router } from 'express';

import validator from '../middlewares/validator.js';
import verifyRole from '../middlewares/verify-role.js';
import verifyAccessToken from '../middlewares/verify-access-token.js';
import verifyRefreshToken from '../middlewares/verify-refresh-token.js';

import {
  createShop,
  getAllShop,
  updateShopById,
  updateLicenseKey,
  deleteShopById,
} from '../controllers/shops.js';

const router = Router();

router.post(
  '/',
  verifyAccessToken,
  verifyRole(['OWNER']),
  validator('createShop'),
  createShop
);
router.get('/', verifyRefreshToken, verifyRole(['OWNER']), getAllShop);
router.patch(
  '/:id',
  verifyAccessToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('updateShop'),
  updateShopById
);
router.patch(
  '/:shop_id/activate-shop',
  verifyAccessToken,
  verifyRole(['OWNER']),
  updateLicenseKey
);
router.delete('/:id', verifyAccessToken, verifyRole(['OWNER', 'ADMIN']), deleteShopById);

export default router;
