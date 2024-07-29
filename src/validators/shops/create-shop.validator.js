import Joi from 'joi';

// CREATE SHOP
export default Joi.object().keys({
  name: Joi.string()
    .trim()
    .strict()
    .required()
    .min(1)
    .max(25)
    .pattern(/^[a-zA-Z0-9\s-.]*$/)
    .messages({
      'any.required': 'Nama toko wajib diisi',
      'string.empty': 'Nama toko tidak boleh kosong',
      'string.min': 'Nama toko harus memiliki setidaknya 1 karakter',
      'string.max': 'Nama toko tidak boleh lebih dari 100 karakter',
      'string.pattern.base': 'Nama toko hanya boleh terdiri dari huruf dan angka',
    }),
  address: Joi.string()
    .trim()
    .strict()
    .required()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z0-9\s-,.|]*$/)
    .messages({
      'any.required': 'Alamat wajib diisi',
      'string.empty': 'Alamat tidak boleh kosong',
      'string.min': 'Alamat harus memiliki setidaknya 2 karakter',
      'string.max': 'Alamat tidak boleh lebih dari 125 karakter',
      'string.pattern.base': 'Alamat hanya boleh terdiri dari huruf dan angka',
    }),
  no_hp: Joi.string()
    .trim()
    .strict()
    .required()
    .min(9)
    .max(14)
    .pattern(/^0[1-9][0-9]{6,10}$/)
    .messages({
      'any.required': 'No. handphone wajib diisi',
      'string.empty': 'No. handphone tidak boleh kosong',
      'string.min': 'No. handphone harus memiliki setidaknya 9 karakter',
      'string.max': 'No. handphone tidak boleh lebih dari 14 karakter',
      'string.pattern.base': 'No. handphone hanya boleh terdiri dari angka',
    }),
});
