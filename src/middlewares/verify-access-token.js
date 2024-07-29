import jwt from 'jsonwebtoken';

import { NODE_ENV, ACCESS_TOKEN } from '../secret.js';
import verifyRefreshToken from './verify-refresh-token.js';
import ErrorResponse from '../utilities/error-response.js';

export default async (req, res, next) => {
  if (NODE_ENV === 'development') {
    verifyRefreshToken(req, res, next);
  } else {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) throw new ErrorResponse(`Access-token tidak tersedia`, 401);

      jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {
        if (err) throw new ErrorResponse(`Access-token tidak valid`, 403);

        req.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          shop_id: decoded.shop_id,
        };

        next();
      });
    } catch (error) {
      next(error);
    }
  }
};
