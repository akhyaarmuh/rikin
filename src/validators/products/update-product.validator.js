import Joi from 'joi';

// UPDATE PRODUCT
export default Joi.object().keys({
  name: Joi.string()
    .trim(true)
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
    'string.min': 'Kategori tidak benar',
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
});
