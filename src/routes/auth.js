import { Router } from 'express';

import validator from '../middlewares/validator.js';
import verifyAccessToken from '../middlewares/verify-access-token.js';
import verifyRefreshToken from '../middlewares/verify-refresh-token.js';
import {
  signUp,
  verifyEmail,
  signIn,
  refreshToken,
  signOut,
  resetPassword,
} from '../controllers/auth.js';

const router = Router();

router.post('/sign-up', validator('signUp'), signUp);
router.get('/verify-email/:token', verifyEmail);
router.post('/sign-in', validator('signIn'), signIn);
router.get('/refresh-token', verifyRefreshToken, refreshToken);
router.delete('/sign-out', verifyAccessToken, signOut);
router.patch('/reset-password', validator('resetPassword'), resetPassword);

export default router;
