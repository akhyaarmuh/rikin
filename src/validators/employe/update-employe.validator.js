import Joi from 'joi';

// auth -> CREATE USER
export default Joi.object().keys({
  role: Joi.string().required().valid('ADMIN', 'CASHIER').messages({
    'any.required': 'Role wajib diisi',
  }),
  status: Joi.boolean().required(),
});
