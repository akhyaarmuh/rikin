import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';

export const createSale = async (req, res, next) => {
  const { total, pay, customer_id, cart } = req.body;
  const debt = pay - total;
  const newCart = [];

  try {
    for (let product of cart) {
      const stock = await checkStock(product.unit_detail_id);

      if (
        detailProduct.product.product_stock_details[0].stock >
        product.qauntity * detailProduct.quantity
      ) {
        newCart.push({
          quantity: product.quantity,
          capital: detailProduct.product.product_stock_details[0].capital,
          profit: detailProduct.product.product_stock_details[0].capital,
        });
      }
    }

    const newData = await prismaClient.categories.create({
      data: { shop_id, name },
      select: { id: true, name: true, created_at: true, updated_at: true },
    });

    res.status(201).json({ data: newData });
  } catch (error) {
    next(error);
  }
};

// utilities

const checkStock = async (id) => {
  const detailProduct = await prismaClient.product_unit_details.findFirst({
    where: { id },
    select: {
      quantity: true,
      product: {
        select: { name: true, product_stock_details: true },
      },
    },
  });

  const availableStock = detailProduct.product.product_stock_details.reduce(
    (acc, arr) => acc + arr.stock,
    0
  );

  if (availableStock < product.qauntity * detailProduct.quantity)
    throw new ErrorResponse(`Stok ${detailProduct.product.name} tidak mencukupi`, 400);

  return detailProduct.product.product_stock_details;
};
