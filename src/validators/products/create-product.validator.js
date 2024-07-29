import Joi from 'joi';

const stockSchema = Joi.object({
  capital: Joi.number().required().min(1).messages({
    'any.required': 'Harga modal wajib diisi',
    'string.min': 'Harga modal harus memiliki setidaknya nilai 1',
  }),
  stock: Joi.number().required().min(1).messages({
    'any.required': 'Jumlah stok wajib diisi',
    'string.min': 'Jumlah stok harus memiliki setidaknya nilai 1',
  }),
});
const unitSchema = Joi.object({
  unit_id: Joi.number().required().messages({
    'any.required': 'Satuan wajib diisi',
    'string.lengrh': 'Satuan tidak benar',
  }),
  code: Joi.string()
    .trim()
    .strict()
    .required()
    .min(1)
    .pattern(/^[a-zA-Z0-9\s]*$/)
    .messages({
      'any.required': 'Kode produk wajib diisi',
      'string.min': 'Kode produk harus memiliki setidaknya 1 karakter',
      'string.pattern.base': 'Kode produk hanya boleh terdiri dari huruf dan angka',
    }),
  quantity: Joi.number().required().min(1).messages({
    'any.required': 'Jumlah satuan wajib diisi',
    'string.min': 'Jumlah satuan harus memiliki setidaknya nilai 1',
  }),
  price: Joi.number().required().min(1).messages({
    'any.required': 'Harga ecer wajib diisi',
    'string.min': 'Harga ecer harus memiliki setidaknya nilai 1',
  }),
  sale_price: Joi.number().required().min(0).messages({
    'any.required': 'Harga partai wajib diisi',
    'string.min': 'Harga partai harus memiliki setidaknya nilai 0 atau lebih',
  }),
});

// CREATE PRODUCT
export default Joi.object().keys({
  name: Joi.string()
    .trim()
    .strict()
    .required()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z0-9\s-.&]*$/)
    .messages({
      'any.required': 'Nama produk wajib diisi',
      'string.empty': 'Nama produk tidak boleh kosong',
      'string.min': 'Nama produk harus memiliki setidaknya 2 karakter',
      'string.max': 'Nama produk tidak boleh lebih dari 50 karakter',
      'string.pattern.base': 'Nama produk hanya boleh terdiri dari huruf dan angka',
    }),
  category_id: Joi.number().required().messages({
    'any.required': 'Kategori wajib diisi',
    'string.length': 'Kategori tidak benar',
  }),
  description: Joi.string()
    .trim()
    .strict()
    .min(3)
    .max(225)
    .pattern(/^[a-zA-Z0-9\s-,.]*$/)
    .empty('')
    .messages({
      'string.min': 'Deskripsi harus memiliki setidaknya 3 karakter',
      'string.max': 'Deskripsi tidak boleh lebih dari 225 karakter',
      'string.pattern.base': 'Deskripsi hanya boleh terdiri dari huruf dan angka',
    }),
  min_stock: Joi.number().required().min(0).messages({
    'any.required': 'Minimal stok wajib diisi',
    'string.min': 'Minimal stok harus memiliki setidaknya nilai 0 atau lebih',
  }),
  stock_detail: Joi.array().items(stockSchema),
  unit_detail: Joi.array().items(unitSchema).min(1),
});
