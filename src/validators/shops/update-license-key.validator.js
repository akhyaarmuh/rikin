import Joi from 'joi';

// UPDATE LICENSE KEY
export default Joi.object().keys({
  license_key: Joi.string().trim().strict().required().min(1).messages({
    'any.required': 'License key wajib diisi',
    'string.empty': 'License key tidak boleh kosong',
    'string.min': 'License key harus memiliki setidaknya 1 karakter',
  }),
});
