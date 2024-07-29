import Joi from 'joi';

// users -> UPDATE
export default Joi.object().keys({
  full_name: Joi.string()
    .trim()
    .strict()
    .required()
    .min(3)
    .max(25)
    .pattern(/^[a-zA-Z\s.]*$/)
    .messages({
      'any.required': 'Nama lengkap wajib diisi',
      'string.empty': 'Nama lengkap tidak boleh kosong',
      'string.min': 'Nama lengkap harus memiliki setidaknya 2 karakter',
      'string.max': 'Nama lengkap tidak boleh lebih dari 25 karakter',
      'string.pattern.base': 'Nama lengkap hanya boleh terdiri dari huruf',
    }),
});
