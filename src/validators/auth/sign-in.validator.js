import Joi from 'joi';

// auth -> SIGN-IN
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
  password: Joi.string()
    .trim()
    .strict()
    .required()
    .allow('')
    .min(7)
    .max(20)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_]*$/)
    .messages({
      'any.required': 'Katasandi wajib diisi',
      'string.min': 'Katasandi harus memiliki setidaknya 7 karakter',
      'string.max': 'Katasandi tidak boleh lebih dari 20 karakter',
      'string.pattern.base':
        'Katasandi harus memiliki setidaknya satu huruf besar, huruf kecil dan angka',
    }),
  shop_id: Joi.number().optional(),
});
