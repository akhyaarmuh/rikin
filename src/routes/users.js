import { Router } from 'express';

import validator from '../middlewares/validator.js';
import verifyAccessToken from '../middlewares/verify-access-token.js';

import { updateUserById, updatePasswordById } from '../controllers/users.js';

const router = Router();
router.patch('/:id', verifyAccessToken, validator('updateUser'), updateUserById);
router.patch(
  '/:id/password',
  verifyAccessToken,
  validator('updateUserPassword'),
  updatePasswordById
);

export default router;
