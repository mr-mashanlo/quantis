import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { transactionController } from './index.js';

const transactionRouter = Router();

transactionRouter.get( '/transactions', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR', 'PHARMACIST', 'NURSE' ] ), ( req, res, next ) => transactionController.getTransactions( req, res, next ) );

export { transactionRouter };
