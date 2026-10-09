import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { transactionController } from './index.js';

const transactionRouter = Router();

transactionRouter.get( '/transactions', isAuth, ( req, res, next ) => transactionController.getTransactions( req, res, next ) );

export { transactionRouter };
