import jwt from 'jsonwebtoken';

import { prismaClient } from '../app.js';
import { NODE_ENV, REFRESH_TOKEN } from '../secret.js';
import ErrorResponse from '../utilities/error-response.js';

export default async (req, res, next) => {
  try {
    const refresh_token = req.cookies['refresh-token'];
    if (!refresh_token) throw new ErrorResponse(`Refresh-token tidak tersedia`, 401);

    const user = await prismaClient.users.findFirst({
      where: {
        refresh_token,
      },
    });
    if (!user) throw new ErrorResponse(`Refresh-token tidak ditemukan`, 403);

    if (!user.status) throw new ErrorResponse(`Akun anda terblokir`, 403);

    jwt.verify(refresh_token, REFRESH_TOKEN, (err, decoded) => {
      if (err) throw new ErrorResponse(`Refresh-token tidak valid`, 403);

      req.user = {
        id: decoded.id,
        email: decoded.email,
        full_name: decoded.full_name,
        role: decoded.role,
        shop_id: decoded.shop_id,
        shop: decoded.shop,
      };

      next();
    });
  } catch (error) {
    next(error);
  }
};

// if (NODE_ENV === 'development') {
//   req.user = {
//     id: 1,
//     email: 'akhyaarmuh@gmail.com',
//     full_name: 'Muhammd Akhyar',
//     role: 'owner',
//     shop_id: 1,
//     shop: {
//       name: 'NW Store',
//       no_hp: '082354566666',
//       address: 'Amuntai, Ds. Tigarun RT. 03 No. 03',
//       expired_at: 'datetime',
//     },
//   };
//   return next();
// }
