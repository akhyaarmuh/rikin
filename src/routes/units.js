import { Router } from 'express';

import validator from '../middlewares/validator.js';
import {
  createUnit,
  getAllUnit,
  updateUnitById,
  deleteUnitById,
} from '../controllers/units.js';
import verifyRole from '../middlewares/verify-role.js';
import verifyAccesToken from '../middlewares/verify-access-token.js';
import verifyRefreshToken from '../middlewares/verify-refresh-token.js';

const router = Router();

router.post(
  '/',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('createUnit'),
  createUnit
);
router.get('/', verifyRefreshToken, getAllUnit);
router.patch(
  '/:id',
  verifyAccesToken,
  verifyRole(['OWNER', 'ADMIN']),
  validator('createUnit'),
  updateUnitById
);
router.delete('/:id', verifyAccesToken, verifyRole(['OWNER', 'ADMIN']), deleteUnitById);

export default router;
