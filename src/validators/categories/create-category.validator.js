import Joi from 'joi';

// auth -> CREATE CATEGORY
export default Joi.object().keys({
  name: Joi.string()
    .trim()
    .strict()
    .required()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z\s.-]*$/)
    .messages({
      'any.required': 'Kategori wajib diisi',
      'string.empty': 'Kategori tidak boleh kosong',
      'string.min': 'Kategori harus memiliki setidaknya 2 karakter',
      'string.max': 'Kategori tidak boleh lebih dari 30 karakter',
      'string.pattern.base': 'Kategori hanya boleh terdiri dari huruf',
    }),
});
