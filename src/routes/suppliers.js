import { Router } from 'express';

import validator from '../middlewares/validator.js';
import {
  createSupplier,
  getAllSupplier,
  updateSupplierById,
  deleteSupplierById,
} from '../controllers/suppliers.js';
import verifyRole from '../middlewares/verify-role.js';
import verifyAccesToken from '../middlewares/verify-access-token.js';
import verifyRefreshToken from '../middlewares/verify-refresh-token.js';

const router = Router();

router.post(
  '/',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('createSupplier'),
  createSupplier
);
router.get('/', verifyRefreshToken, getAllSupplier);
router.patch(
  '/:id',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('createSupplier'),
  updateSupplierById
);
router.delete(
  '/:id',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  deleteSupplierById
);

export default router;
