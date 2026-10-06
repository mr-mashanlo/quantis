import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { balanceController } from './index.js';

const balanceRouter = Router();

balanceRouter.get( '/balances', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR', 'PHARMACIST', 'NURSE' ] ), ( req, res, next ) => balanceController.getBalances( req, res, next ) );

export { balanceRouter };
