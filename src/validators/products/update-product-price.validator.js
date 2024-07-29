import Joi from 'joi';

// UPDATE PRODUCT PRICE
export default Joi.object().keys({
  price: Joi.number().required().min(1).messages({
    'any.required': 'Harga ecer wajib diisi',
    'string.min': 'Harga ecer harus memiliki setidaknya nilai 1',
  }),
  sale_price: Joi.number().required().min(0).messages({
    'any.required': 'Harga partai wajib diisi',
    'string.min': 'Harga partai harus memiliki setidaknya nilai 0 atau lebih',
  }),
});
