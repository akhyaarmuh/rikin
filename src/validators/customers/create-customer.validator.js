import Joi from 'joi';

// auth -> CREATE Customer
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
      'string.pattern.base': 'Nama lengkap hanya boleh terdiri dari huruf dan angka',
    }),
  address: Joi.string()
    .trim()
    .strict()
    .required()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z0-9\s-,.|]*$/)
    .messages({
      'any.required': 'Alamat pelanggan wajib diisi',
      'string.empty': 'Alamat pelanggan tidak boleh kosong',
      'string.min': 'Alamat pelanggan harus memiliki setidaknya 2 karakter',
      'string.max': 'Alamat pelanggan tidak boleh lebih dari 125 karakter',
      'string.pattern.base': 'Alamat pelanggan hanya boleh terdiri dari huruf dan angka',
    }),
});
