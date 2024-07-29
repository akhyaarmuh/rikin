import jwt from 'jsonwebtoken';

import { prismaClient } from '../app.js';
import { LOCATION, LICENSE_TOKEN } from '../secret.js';
import ErrorResponse from '../utilities/error-response.js';
import { createExpTime } from '../utilities/license-key.js';

export const createShop = async (req, res, next) => {
  const { id } = req.user;
  const { name, address, no_hp } = req.body;

  try {
    if (LOCATION === 'local') {
      const shop = await prismaClient.shops.findFirst();

      // jika akun admin sudah terdaftar
      if (shop) throw new ErrorResponse(`Toko sudah ada`, 400);
    }

    const shop = await prismaClient.shops.findFirst({
      where: {
        owner_id: id,
        name,
        address,
      },
    });

    // toko ini sudah ada
    if (shop) throw new ErrorResponse(`Toko sudah ada`, 400);

    const newData = await prismaClient.shops.create({
      data: {
        owner_id: id,
        name,
        address,
        no_hp,
        expired_at: createExpTime(),
      },
      select: {
        name: true,
      },
    });

    res.status(201).json({ data: newData });
  } catch (error) {
    next(error);
  }
};

export const getAllShop = async (req, res, next) => {
  const { id } = req.user;
  let page, limit;

  try {
    page = Number(req.query.page || 1);
    limit = Number(req.query.limit || 20);

    const rows = await prismaClient.shops.count({
      where: {
        owner_id: id,
      },
    });

    const pages = Math.ceil(rows / limit);

    const data = await prismaClient.shops.findMany({
      where: {
        owner_id: id,
      },
      select: {
        id: true,
        name: true,
        no_hp: true,
        address: true,
        expired_at: true,
        foot_note: true,
        pole_note: true,
      },
      orderBy: { name: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    res.status(200).json({ data, rows, page, pages, limit });
  } catch (error) {
    next(error);
  }
};

export const updateShopById = async (req, res, next) => {
  const { id } = req.params;
  const { name, no_hp, address, foot_note, pole_note } = req.body;

  try {
    await prismaClient.shops.update({
      where: { id: Number(id) },
      data: {
        name,
        no_hp,
        address,
        foot_note: foot_note ? foot_note : null,
        pole_note: pole_note ? pole_note : null,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    if (error.code == 'P2002') {
      switch (error.meta.target) {
        case 'name_address_unique':
          next(new ErrorResponse(`Toko ini sudah ada`, 400));
          break;

        default:
          next(new ErrorResponse(`Duplicate field`, 400));
      }
    } else next(error);
  }
};

export const updateLicenseKey = async (req, res, next) => {
  let dec;
  const { shop_id } = req.params;
  const { license_key } = req.body;

  try {
    jwt.verify(license_key, LICENSE_TOKEN || 'SecretKeyForLicense', (err, decoded) => {
      if (err) throw new ErrorResponse(`License key is not valid`, 400);

      dec = decoded;
    });

    if (dec.email !== 'akhyaarmuh@gmail.com')
      throw new ErrorResponse(`License key is not valid`, 400);

    const licensekeyIsUsed = await prismaClient.shops.findFirst({
      where: { license_key },
    });

    if (licensekeyIsUsed) throw new ErrorResponse(`License key is used`, 400);

    await prismaClient.shops.update({
      where: { id: Number(shop_id) },
      data: { expired_at: createExpTime(dec.days), license_key },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const deleteShopById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await prismaClient.shops.delete({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        no_hp: true,
        address: true,
        foot_note: true,
        pole_note: true,
        created_at: true,
        updated_at: true,
      },
    });

    res.status(200).json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
