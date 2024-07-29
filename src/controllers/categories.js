import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';

export const createCategory = async (req, res, next) => {
  const { shop_id } = req.user;
  const { name } = req.body;

  try {
    const category = await prismaClient.categories.findFirst({
      where: { shop_id, name },
    });

    // toko ini sudah ada
    if (category) throw new ErrorResponse(`Kategori ${name} sudah ada`, 400);

    const newData = await prismaClient.categories.create({
      data: { shop_id, name },
      select: { id: true, name: true, created_at: true, updated_at: true },
    });

    res.status(201).json({ data: newData });
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (req, res, next) => {
  const { shop_id } = req.user;
  const { name = '', ...query } = req.query;
  let page, limit;

  try {
    page = Number(query.page || 1);
    limit = Number(query.limit);

    const rows = await prismaClient.categories.count({
      where: {
        shop_id,
        name: {
          contains: name,
        },
      },
    });

    const pages = Math.ceil(rows / (!limit ? rows : limit));

    const data = await prismaClient.categories.findMany({
      where: {
        shop_id,
        name: {
          contains: name,
        },
      },
      select: { id: true, name: true, created_at: true, updated_at: true },
      orderBy: { name: 'asc' },
      skip: (page - 1) * limit,
      take: !limit ? rows : limit,
    });

    res.status(200).json({ data, rows, page, pages, limit });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await prismaClient.categories.update({
      where: { id: Number(id) },
      data: { name },
    });

    res.sendStatus(204);
  } catch (error) {
    if (error.code == 'P2002') {
      switch (error.meta.target) {
        case 'name_unique':
          next(new ErrorResponse(`Kategori ini sudah ada`, 400));
          break;

        default:
          next(new ErrorResponse(`Duplicate field`, 400));
      }
    } else next(error);
  }
};

export const deleteCategoryById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await prismaClient.categories.delete({
      where: { id: Number(id) },
      select: { id: true, name: true, created_at: true, updated_at: true },
    });

    res.status(200).json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
