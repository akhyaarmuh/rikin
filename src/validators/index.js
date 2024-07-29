// auth
import signUp from './auth/sign-up.validator.js';
import signIn from './auth/sign-in.validator.js';
import resetPassword from './auth/reset-password.validator.js';

// employe
import createEmploye from './employe/create-employe.validator.js';
import updateEmploye from './employe/update-employe.validator.js';

// shops
import createShop from './shops/create-shop.validator.js';
import updateShop from './shops/update-shop.validator.js';
import updateLicenseKey from './shops/update-license-key.validator.js';

// categories
import createCategory from './categories/create-category.validator.js';

// units
import createUnit from './units/create-unit.validator.js';

// products
import createProduct from './products/create-product.validator.js';
import updateProduct from './products/update-product.validator.js';
import updateProductCode from './products/update-product-code.validator.js';
import updateProductPrice from './products/update-product-price.validator.js';
import updateProductStock from './products/update-product-stock.validator.js';

// customers
import createCustomer from './customers/create-customer.validator.js';

// suppliers
import createSupplier from './suppliers/create-supplier.validator.js';

// users
import updateUser from './users/update-user.validator.js';
import updateUserPassword from './users/update-user-password.validator.js';

export default {
  signUp,
  signIn,
  resetPassword,

  createEmploye,
  updateEmploye,

  createShop,
  updateShop,
  updateLicenseKey,

  createCategory,

  createUnit,

  createProduct,
  updateProduct,
  updateProductCode,
  updateProductPrice,
  updateProductStock,

  createCustomer,

  createSupplier,

  updateUser,
  updateUserPassword,
};
