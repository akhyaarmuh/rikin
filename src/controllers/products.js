import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';

export const createProduct = async (req, res, next) => {
  const { shop_id } = req.user;
  const { unit_detail, stock_detail, ...pro } = req.body;

  try {
    const product = await prismaClient.products.findFirst({
      where: { shop_id, name: pro.name },
    });
    // Produk sudah ada
    if (product) throw new ErrorResponse(`Produk ${pro.name} sudah ada`, 400);

    for (const detail of unit_detail) {
      const code = await prismaClient.product_unit_details.findFirst({
        where: { shop_id, code: detail.code },
      });
      // Kode produk sudah digunakan
      if (code)
        throw new ErrorResponse(`Kode produk ${detail.code} sudah digunakan`, 400);
    }

    const newData = await prismaClient.$transaction(async (prismaClient) => {
      const product_unit_details = [];
      const product_stock_details = [];

      const newProduct = await prismaClient.products.create({
        data: {
          shop_id,
          ...pro,
          description: pro.description || null,
          min_stock: pro.min_stock || null,
        },
        select: {
          id: true,
          name: true,
          description: true,
          min_stock: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },

          created_at: true,
          updated_at: true,
        },
      });

      for (const unit of unit_detail) {
        const newUnitDetail = await prismaClient.product_unit_details.create({
          data: {
            shop_id,
            product_id: newProduct.id,
            unit_id: unit.unit_id,
            code: unit.code,
            quantity: unit.quantity,
          },
          select: {
            id: true,
            code: true,
            quantity: true,
            unit: {
              select: { name: true },
            },
          },
        });

        const newPriceDetail = await prismaClient.product_price_details.create({
          data: {
            shop_id,
            product_unit_detail_id: newUnitDetail.id,
            price: unit.price,
            sale_price: unit.sale_price,
          },
          select: {
            price: true,
            sale_price: true,
          },
        });

        product_unit_details.push({ ...newUnitDetail, price: [newPriceDetail] });
      }

      for (const stock of stock_detail) {
        const newStockDetail = await prismaClient.product_stock_details.create({
          data: {
            shop_id,
            product_id: newProduct.id,
            capital: stock.capital,
            stock: stock.stock * unit_detail[unit_detail.length - 1].quantity,
          },
          select: {
            capital: true,
            stock: true,
          },
        });

        product_stock_details.push({ ...newStockDetail });
      }

      return { ...newProduct, product_unit_details, product_stock_details };
    });

    res.status(201).json({ data: newData });
  } catch (error) {
    next(error);
  }
};

export const getAllProduct = async (req, res, next) => {
  const { shop_id } = req.user;
  const { category_id, name, code, ...query } = req.query;
  let page, limit;

  try {
    page = Number(query.page || 1);
    limit = Number(query.limit || 20);

    const rows = await prismaClient.products.count({
      where: {
        shop_id,
        category_id: category_id ? Number(category_id) : undefined,
        name: name ? { contains: name } : undefined,
        product_unit_details: {
          some: {
            code: code ? code : undefined,
          },
        },
      },
    });

    const pages = Math.ceil(rows / limit);

    const data = await prismaClient.products.findMany({
      where: {
        shop_id,
        category_id: category_id ? Number(category_id) : undefined,
        name: name ? { contains: name } : undefined,
        product_unit_details: {
          some: {
            code: code ? code : undefined,
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        min_stock: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        product_unit_details: {
          select: {
            id: true,
            code: true,
            quantity: true,
            unit: {
              select: { name: true },
            },
            price: {
              where: {
                shop_id,
              },
              select: {
                price: true,
                sale_price: true,
              },
            },
          },
          orderBy: { quantity: 'asc' },
        },
        product_stock_details: {
          select: {
            capital: true,
            stock: true,
          },
          where: {
            shop_id,
          },
        },
      },
      orderBy: name ? { name: 'asc' } : { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    res.status(200).json({ data, rows, page, pages, limit });
  } catch (error) {
    next(error);
  }
};

export const getAllProductForSales = async (req, res, next) => {
  const { shop_id } = req.user;
  const { name, ...query } = req.query;
  let page, limit;

  try {
    page = Number(query.page || 1);
    limit = Number(query.limit || 20);

    const rows = await prismaClient.product_unit_details.count({
      where: {
        shop_id,
        product: {
          name: name ? { contains: name } : undefined,
        },
      },
    });

    const pages = Math.ceil(rows / limit);

    const data = await prismaClient.product_unit_details.findMany({
      where: {
        shop_id,
        product: {
          name: name ? { contains: name } : undefined,
        },
      },
      select: {
        id: true,
        code: true,
        quantity: true,
        product: {
          select: {
            id: true,
            name: true,
            product_stock_details: {
              where: { shop_id },
              select: { stock: true },
            },
          },
        },
        unit: {
          select: { name: true },
        },
        price: {
          where: {
            shop_id,
          },
          select: {
            price: true,
            sale_price: true,
          },
        },
      },
      orderBy: [
        {
          product: {
            name: 'asc',
          },
        },
        { quantity: 'asc' },
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    res.status(200).json({ data, rows, page, pages, limit });
  } catch (error) {
    next(error);
  }
};

export const getProductByCode = async (req, res, next) => {
  const { shop_id } = req.user;
  const { code } = req.params;

  try {
    const product = await prismaClient.product_unit_details.findFirst({
      where: { shop_id, code },
      select: {
        id: true,
        code: true,
        quantity: true,
        price: {
          where: { shop_id },
          select: { price: true, sale_price: true },
        },
        product: {
          select: {
            id: true,
            name: true,
            product_stock_details: {
              where: { shop_id },
              select: { stock: true },
            },
          },
        },
        unit: {
          select: { name: true },
        },
      },
    });

    if (!product) throw new ErrorResponse('Produk tidak ditemukan', 404);

    const stock = product.product.product_stock_details.reduce(
      (acc, stock) => acc + stock.stock,
      0
    );

    const data = {
      id: product.product.id,
      unit_detail_id: product.id,
      code: product.code,
      name: product.product.name,
      unit_name: product.unit.name,
      prices: product.price[0],
      stock: Math.floor(stock / product.quantity),
    };

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    await prismaClient.products.update({
      where: { id: Number(id) },
      data: { ...payload, description: payload.description || null },
    });

    res.sendStatus(204);
  } catch (error) {
    if (error.code == 'P2002') {
      switch (error.meta.target) {
        case 'name_unique':
          next(new ErrorResponse(`Produk ini sudah ada`, 400));
          break;

        default:
          next(new ErrorResponse(`Duplicate field`, 400));
      }
    } else next(error);
  }
};

export const updateProductCodeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prismaClient.product_unit_details.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.sendStatus(204);
  } catch (error) {
    if (error.code == 'P2002') {
      switch (error.meta.target) {
        case 'code_unique':
          next(new ErrorResponse(`Kode produk ini sudah digunakan`, 400));
          break;

        default:
          next(new ErrorResponse(`Duplicate field`, 400));
      }
    } else next(error);
  }
};

export const updateProductPriceById = async (req, res, next) => {
  const { shop_id } = req.user;
  const { id } = req.params;

  try {
    await prismaClient.product_price_details.update({
      where: {
        shop_id_product_unit_detail_id: {
          shop_id,
          product_unit_detail_id: Number(id),
        },
      },
      data: req.body,
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updateProductStockById = async (req, res, next) => {
  const { shop_id } = req.user;
  const { id } = req.params;
  const { stock_detail } = req.body;

  try {
    await prismaClient.$transaction(async (prismaClient) => {
      await prismaClient.product_stock_details.deleteMany({
        where: { shop_id, product_id: Number(id) },
      });

      for (const stock of stock_detail) {
        await prismaClient.product_stock_details.create({
          data: {
            shop_id,
            product_id: Number(id),
            capital: stock.capital,
            stock: stock.stock,
          },
        });
      }
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await prismaClient.products.delete({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        category_id: true,
        description: true,
        min_stock: true,
        created_at: true,
        updated_at: true,
      },
    });

    res.status(200).json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
