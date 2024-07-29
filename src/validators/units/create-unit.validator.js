import Joi from 'joi';

// auth -> CREATE UNIT
export default Joi.object().keys({
  name: Joi.string()
    .trim()
    .strict()
    .required()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z0-9\s.-/]*$/)
    .messages({
      'any.required': 'Satuan wajib diisi',
      'string.empty': 'Satuan tidak boleh kosong',
      'string.min': 'Satuan harus memiliki setidaknya 2 karakter',
      'string.max': 'Satuan tidak boleh lebih dari 30 karakter',
      'string.pattern.base': 'Satuan hanya boleh terdiri dari huruf dan angka',
    }),
});
