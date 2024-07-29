import { Router } from 'express';

import authRouter from './auth.js';
import employeRouter from './employe.js';
import shopsRouter from './shops.js';
import categoriesRouter from './categories.js';
import unitsRouter from './units.js';
import productsRouter from './products.js';
import customersRouter from './customers.js';
import suppliersRouter from './suppliers.js';
import usersRouter from './users.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/employe', employeRouter);
router.use('/shops', shopsRouter);
router.use('/categories', categoriesRouter);
router.use('/units', unitsRouter);
router.use('/products', productsRouter);
router.use('/customers', customersRouter);
router.use('/suppliers', suppliersRouter);
router.use('/users', usersRouter);

export default router;
