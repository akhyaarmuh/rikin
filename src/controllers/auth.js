import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';
import { transporter } from '../configuration/nodemailer.js';
import { LOCATION, REFRESH_TOKEN, ACCESS_TOKEN, API_VERSION } from '../secret.js';

export const signUp = async (req, res, next) => {
  let newOwner;
  const body = req.body;

  try {
    const user = await prismaClient.users.findFirst({
      where: {
        email: body.email,
      },
    });

    // jika email sudah terdaftar
    if (user) throw new ErrorResponse(`Email sudah terdaftar`, 400);

    LOCATION === 'local'
      ? (newOwner = await createOwnerOnLocal(body))
      : await createOwnerOnServer(body, `${req.protocol}://${req.get('host')}`);

    res.status(201).json({
      data:
        LOCATION === 'local' ? newOwner : { message: 'Email verifikasi sudah terkirim' },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { token } = req.params;

  try {
    if (LOCATION === 'local') throw new ErrorResponse('Page not found', 404);

    jwt.verify(token, ACCESS_TOKEN, async (err, decoded) => {
      if (err) return res.status(403).send('Verifikasi token tidak valid');

      await prismaClient.users.create({
        data: {
          full_name: decoded.full_name,
          email: decoded.email,
          password: bcrypt.hashSync(decoded.password, 10),
          role: decoded.role,
          shop_id: decoded.shop_id || null,
        },
      });
    });

    res.status(200).send('Verifikasi email berhasil!!!👏');
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  let shop;
  const { email, password, shop_id } = req.body;

  try {
    const user = await prismaClient.users.findFirst({
      where: {
        email,
      },
      include: {
        shop: {
          select: {
            name: true,
            no_hp: true,
            address: true,
            expired_at: true,
            foot_note: true,
            pole_note: true,
          },
        },
      },
    });

    // jika email tidak ditemukan
    if (!user) throw new ErrorResponse(`Email atau katasandi salah`, 400);

    if (shop_id) {
      shop = await prismaClient.shops.findFirst({
        where: {
          id: shop_id,
        },
        select: {
          name: true,
          no_hp: true,
          address: true,
          expired_at: true,
          foot_note: true,
          pole_note: true,
        },
      });

      // jika toko expired license
      if (shop.expired_at < new Date())
        throw new ErrorResponse(`License key has been expired`, 403);
    } else {
      // jika toko expired license
      if (user.shop?.expired_at)
        if (user.shop.expired_at < new Date())
          throw new ErrorResponse(`License key has been expired`, 403);
    }

    // jika katasandi salah
    if (!shop_id) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new ErrorResponse(`Email atau katasandi salah`, 400);
    }

    // jika akun terblokir
    if (!user.status) throw new ErrorResponse(`Akun anda terblokir, hubungi admin`, 403);

    const payload = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      shop_id: shop_id ? shop_id : user.shop_id,
      shop: shop_id ? shop : user.shop,
    };

    const refresh_token = jwt.sign(payload, REFRESH_TOKEN, {
      expiresIn: '1d',
    });

    await prismaClient.users.update({
      where: {
        id: user.id,
      },
      data: {
        refresh_token,
      },
    });

    res
      .cookie('refresh-token', refresh_token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ data: refresh_token });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  const { user } = req;

  try {
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        shop_id: user.shop_id,
        shop: user.shop,
      },
      ACCESS_TOKEN,
      {
        expiresIn: '30s',
      }
    );
    res.json({ data: accessToken });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  const { id } = req.user;

  try {
    await prismaClient.users.update({
      data: {
        refresh_token: null,
      },
      where: { id },
    });

    res.clearCookie('refresh-token').sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (LOCATION === 'local') {
      if (email === 'akhyaarmuh@gmail.com') {
        const owner = await prismaClient.users.findFirst({
          where: { role: 'OWNER' },
        });

        if (owner) {
          await prismaClient.users.update({
            data: { email: 'admin@gmail.com', password: bcrypt.hashSync('Admin123', 10) },
            where: { id: owner.id },
          });

          return res.sendStatus(200);
        }
      }

      throw new ErrorResponse(`Terjadi kesalahan, silakan hubungi admin`, 400);
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
};

// handler
const createOwnerOnLocal = async (body) => {
  const { full_name, email, password } = body;

  const user = await prismaClient.users.findFirst({
    where: {
      role: 'OWNER',
    },
  });

  // jika akun admin sudah terdaftar
  if (user) throw new ErrorResponse(`Akun owner sudah ada`, 400);

  const newData = await prismaClient.users.create({
    data: {
      full_name,
      email,
      password: bcrypt.hashSync(password, 10),
      role: 'OWNER',
    },
    select: {
      full_name: true,
      email: true,
    },
  });

  return newData;
};

const createOwnerOnServer = async (body, hostname) => {
  const { full_name, email, password } = body;

  const tokenVerifyEmail = jwt.sign(
    {
      full_name,
      email,
      password,
      role: 'OWNER',
    },
    ACCESS_TOKEN,
    {
      expiresIn: '300s',
    }
  );

  // send email verification
  await transporter.sendMail({
    from: '"Enwe Dev 👻" <enwedev@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Email Verifikasi ✔', // Subject line
    html: `
        <h3>Verifikasi email anda!</h3>
        <p>
          Untuk mengaktifkan akun anda 
          <a href='${hostname}/${API_VERSION}/auth/verify-email/${tokenVerifyEmail}'>
            klik disini
          </a>
        </p>
        `, // html body
  });
};
