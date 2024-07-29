import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';
import { transporter } from '../configuration/nodemailer.js';
import { LOCATION, ACCESS_TOKEN, API_VERSION } from '../secret.js';

export const createEmploye = async (req, res, next) => {
  const { shop_id } = req.user;
  const body = req.body;

  try {
    const user = await prismaClient.users.findFirst({
      where: { email: body.email },
    });

    // jika email sudah terdaftar
    if (user) throw new ErrorResponse(`Email sudah terdaftar`, 400);

    LOCATION === 'local'
      ? await createUserOnLocal(shop_id, body)
      : await createUserOnServer(shop_id, body, `${req.protocol}://${req.get('host')}`);

    res.status(201).json({
      data: LOCATION === 'local' ? null : { message: 'Email verifikasi sudah terkirim' },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEmploye = async (req, res, next) => {
  const { shop_id } = req.user;
  const { full_name = '', ...query } = req.query;
  let page, limit;

  try {
    page = Number(query.page || 1);
    limit = Number(query.limit || 20);

    const rows = await prismaClient.users.count({
      where: {
        shop_id,
        full_name: full_name
          ? {
              contains: full_name,
            }
          : undefined,
      },
    });

    const pages = Math.ceil(rows / limit);

    const data = await prismaClient.users.findMany({
      where: {
        shop_id,
        full_name: full_name
          ? {
              contains: full_name,
            }
          : undefined,
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        role: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: { full_name: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    res.status(200).json({ data, rows, page, pages, limit });
  } catch (error) {
    next(error);
  }
};

export const updateEmployeById = async (req, res, next) => {
  const { id } = req.params;
  const { role, status } = req.body;

  try {
    await prismaClient.users.update({
      where: { id: Number(id) },
      data: { role, status },
    });

    if (!status)
      await prismaClient.users.update({
        where: { id: Number(id) },
        data: { refresh_token: null },
      });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await prismaClient.users.delete({
      where: { id: Number(id) },
      select: {
        id: true,
        full_name: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    res.status(200).json({ data: deleted });
  } catch (error) {
    next(error);
  }
};

// handler
const createUserOnLocal = async (shop_id, body) => {
  const { full_name, email, role, password } = body;

  await prismaClient.users.create({
    data: { shop_id, full_name, email, role, password: bcrypt.hashSync(password, 10) },
  });
};

const createUserOnServer = async (shop_id, body, hostname) => {
  const { full_name, email, role, password } = body;

  const tokenVerifyEmail = jwt.sign(
    {
      shop_id,
      full_name,
      email,
      role,
      password,
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
