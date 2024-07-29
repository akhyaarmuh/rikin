import { Router } from 'express';

import validator from '../middlewares/validator.js';
import verifyRole from '../middlewares/verify-role.js';
import verifyAccessToken from '../middlewares/verify-access-token.js';
import verifyRefreshToken from '../middlewares/verify-refresh-token.js';

import {
  createEmploye,
  getAllEmploye,
  updateEmployeById,
  deleteEmployeById,
} from '../controllers/employe.js';

const router = Router();

router.post(
  '/',
  verifyAccessToken,
  verifyRole(['OWNER']),
  validator('createEmploye'),
  createEmploye
);
router.get('/', verifyRefreshToken, verifyRole(['OWNER']), getAllEmploye);
router.patch(
  '/:id',
  verifyAccessToken,
  verifyRole(['OWNER']),
  validator('updateEmploye'),
  updateEmployeById
);
router.delete('/:id', verifyAccessToken, verifyRole(['OWNER']), deleteEmployeById);

export default router;
