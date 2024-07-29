import Joi from 'joi';

// users -> UPDATE PASSWORD
export default Joi.object().keys({
  password: Joi.string().required(),
  newPassword: Joi.string()
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
});
