import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';

export const createCustomer = async (req, res, next) => {
  const { shop_id } = req.user;
  const { full_name, address } = req.body;

  try {
    const customer = await prismaClient.customers.findFirst({
      where: { shop_id, full_name, address },
    });

    // toko ini sudah ada
    if (customer)
      throw new ErrorResponse(`Pelanggan ${full_name} dengan alamat ini sudah ada`, 400);

    const newData = await prismaClient.customers.create({
      data: { shop_id, full_name, address },
      select: {
        id: true,
        full_name: true,
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

export const getAllCustomer = async (req, res, next) => {
  const { shop_id } = req.user;
  const { full_name = '', ...query } = req.query;
  let page, limit;

  try {
    page = Number(query.page || 1);
    limit = Number(query.limit);

    const rows = await prismaClient.customers.count({
      where: {
        shop_id,
        full_name: full_name
          ? {
              contains: full_name,
            }
          : undefined,
      },
    });

    const pages = Math.ceil(rows / (!limit ? rows : limit));

    const data = await prismaClient.customers.findMany({
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
        address: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: full_name ? { full_name: 'asc' } : { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: !limit ? rows : limit,
    });

    res.status(200).json({ data, rows, page, pages, limit });
  } catch (error) {
    next(error);
  }
};

export const updateCustomerById = async (req, res, next) => {
  const { id } = req.params;
  const { full_name, address } = req.body;

  try {
    await prismaClient.customers.update({
      where: { id: Number(id) },
      data: { full_name, address },
    });

    res.sendStatus(204);
  } catch (error) {
    if (error.code == 'P2002') {
      switch (error.meta.target) {
        case 'customer_unique':
          next(new ErrorResponse(`Pelanggan dengan nama dan alamat ini sudah ada`, 400));
          break;

        default:
          next(new ErrorResponse(`Duplicate field`, 400));
      }
    } else next(error);
  }
};

export const deleteCustomerById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await prismaClient.customers.delete({
      where: { id: Number(id) },
      select: {
        id: true,
        full_name: true,
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
