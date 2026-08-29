import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { transactionController } from './index.js';
import { TransactionSchema } from './schema.js';

const transactionRouter = Router();

transactionRouter.post( '/transactions', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR', 'PHARMACIST', 'NURSE' ] ), validate( TransactionSchema ), ( req, res, next ) => transactionController.createTransaction( req, res, next ) );
transactionRouter.get( '/transactions', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR', 'PHARMACIST', 'NURSE' ] ), ( req, res, next ) => transactionController.getTransactions( req, res, next ) );
transactionRouter.get( '/transactions/:id', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR', 'PHARMACIST', 'NURSE' ] ), ( req, res, next ) => transactionController.getTransactionById( req, res, next ) );

export { transactionRouter };
