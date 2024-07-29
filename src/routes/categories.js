import { Router } from 'express';

import validator from '../middlewares/validator.js';
import {
  createCategory,
  getAllCategory,
  updateCategoryById,
  deleteCategoryById,
} from '../controllers/categories.js';
import verifyRole from '../middlewares/verify-role.js';
import verifyAccesToken from '../middlewares/verify-access-token.js';
import verifyRefreshToken from '../middlewares/verify-refresh-token.js';

const router = Router();

router.post(
  '/',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('createCategory'),
  createCategory
);
router.get('/', verifyRefreshToken, getAllCategory);
router.patch(
  '/:id',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('createCategory'),
  updateCategoryById
);
router.delete(
  '/:id',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  deleteCategoryById
);

export default router;
