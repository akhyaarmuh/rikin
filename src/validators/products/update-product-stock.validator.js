import Joi from 'joi';

// UPDATE PRODUCT STOCK
const stockSchema = Joi.object().keys({
  capital: Joi.number().required().min(1).messages({
    'any.required': 'Harga modal wajib diisi',
    'string.min': 'Harga modal harus memiliki setidaknya nilai 1',
  }),
  stock: Joi.number().required().min(1).messages({
    'any.required': 'Jumlah stok wajib diisi',
    'string.min': 'Jumlah stok harus memiliki setidaknya nilai 1',
  }),
});

export default Joi.object().keys({
  stock_detail: Joi.array().items(stockSchema),
});
