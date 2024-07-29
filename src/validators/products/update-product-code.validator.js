import Joi from 'joi';

// UPDATE PRODUCT PRICE
export default Joi.object().keys({
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
});
