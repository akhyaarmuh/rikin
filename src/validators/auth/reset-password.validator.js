import Joi from 'joi';

// auth -> RESET-PASSWORD
export default Joi.object().keys({
  email: Joi.string()
    .trim()
    .strict()
    .lowercase()
    .required()
    .min(6)
    .max(128)
    .pattern(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/)
    .messages({
      'any.required': 'Email wajib diisi',
      'string.empty': 'Email tidak boleh kosong',
      'string.min': 'Email harus memiliki setidaknya 6 karakter',
      'string.max': 'Email tidak boleh lebih dari 128 karakter',
      'string.pattern.base': 'Email tidak benar',
    }),
});
