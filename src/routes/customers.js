import { Router } from 'express';

import validator from '../middlewares/validator.js';
import {
  createCustomer,
  getAllCustomer,
  updateCustomerById,
  deleteCustomerById,
} from '../controllers/customers.js';
import verifyRole from '../middlewares/verify-role.js';
import verifyAccesToken from '../middlewares/verify-access-token.js';
import verifyRefreshToken from '../middlewares/verify-refresh-token.js';

const router = Router();

router.post(
  '/',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('createCustomer'),
  createCustomer
);
router.get('/', verifyRefreshToken, getAllCustomer);
router.patch(
  '/:id',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('createCustomer'),
  updateCustomerById
);
router.delete(
  '/:id',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  deleteCustomerById
);

export default router;
