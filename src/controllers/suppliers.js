import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';

export const createSupplier = async (req, res, next) => {
  const { shop_id } = req.user;
  const { name, address } = req.body;

  try {
    const supplier = await prismaClient.suppliers.findFirst({
      where: { shop_id, name, address },
    });

    // toko ini sudah ada
    if (supplier)
      throw new ErrorResponse(`Agen ${name} dengan alamat ini sudah ada`, 400);

    const newData = await prismaClient.suppliers.create({
      data: { shop_id, name, address },
      select: {
        id: true,
        name: true,
        address: true,
        created_at: true,
        updated_at: true,
      },
    });

    res.status(201).json({ data: newData });
  } catch (error) {
    next(error);
  }
};

export const getAllSupplier = async (req, res, next) => {
  const { shop_id } = req.user;
  const { name = '', ...query } = req.query;
  let page, limit;

  try {
    page = Number(query.page || 1);
    limit = Number(query.limit);

    const rows = await prismaClient.suppliers.count({
      where: {
        shop_id,
        name: name
          ? {
              contains: name,
            }
          : undefined,
      },
    });

    const pages = Math.ceil(rows / (!limit ? rows : limit));

    const data = await prismaClient.suppliers.findMany({
      where: {
        shop_id,
        name: name
          ? {
              contains: name,
            }
          : undefined,
      },
      select: {
        id: true,
        name: true,
        address: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: name ? { name: 'asc' } : { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: !limit ? rows : limit,
    });

    res.status(200).json({ data, rows, page, pages, limit });
  } catch (error) {
    next(error);
  }
};

export const updateSupplierById = async (req, res, next) => {
  const { id } = req.params;
  const { name, address } = req.body;

  try {
    await prismaClient.suppliers.update({
      where: { id: Number(id) },
      data: { name, address },
    });

    res.sendStatus(204);
  } catch (error) {
    if (error.code == 'P2002') {
      switch (error.meta.target) {
        case 'supplier_unique':
          next(new ErrorResponse(`Agen dengan nama dan alamat ini sudah ada`, 400));
          break;

        default:
          next(new ErrorResponse(`Duplicate field`, 400));
      }
    } else next(error);
  }
};

export const deleteSupplierById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await prismaClient.suppliers.delete({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        address: true,
        created_at: true,
        updated_at: true,
      },
    });

    res.status(200).json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
