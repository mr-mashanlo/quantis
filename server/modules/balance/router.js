import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { balanceController } from './index.js';

const balanceRouter = Router();

balanceRouter.get( '/balances', isAuth, ( req, res, next ) => balanceController.getBalances( req, res, next ) );

export { balanceRouter };
