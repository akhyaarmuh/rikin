import Joi from 'joi';

// auth -> CREATE Customer
export default Joi.object().keys({
  name: Joi.string()
    .trim()
    .strict()
    .required()
    .min(3)
    .max(25)
    .pattern(/^[0-9a-zA-Z\s.]*$/)
    .messages({
      'any.required': 'Nama agen wajib diisi',
      'string.empty': 'Nama agen tidak boleh kosong',
      'string.min': 'Nama agen harus memiliki setidaknya 2 karakter',
      'string.max': 'Nama agen tidak boleh lebih dari 25 karakter',
      'string.pattern.base': 'Nama agen hanya boleh terdiri dari huruf',
    }),
  address: Joi.string()
    .trim()
    .strict()
    .required()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z0-9\s-,.|]*$/)
    .messages({
      'any.required': 'Alamat agen wajib diisi',
      'string.empty': 'Alamat agen tidak boleh kosong',
      'string.min': 'Alamat agen harus memiliki setidaknya 2 karakter',
      'string.max': 'Alamat agen tidak boleh lebih dari 125 karakter',
      'string.pattern.base': 'Alamat agen hanya boleh terdiri dari huruf dan angka',
    }),
});
