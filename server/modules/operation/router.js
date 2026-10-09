import { Router } from 'express';

import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { operationController } from './index.js';
import { CreateOperationSchema, UpdateOperationSchema } from './schema.js';

const operationRouter = Router();

operationRouter.post( '/operations', isAuth, validate( CreateOperationSchema ), ( req, res, next ) => operationController.createOperation( req, res, next ) );
operationRouter.get( '/operations', isAuth, ( req, res, next ) => operationController.getOperations( req, res, next ) );
operationRouter.get( '/operations/:id', isAuth, ( req, res, next ) => operationController.getOperationById( req, res, next ) );
operationRouter.put( '/operations/:id', isAuth, validate( UpdateOperationSchema ), ( req, res, next ) => operationController.updateOperationById( req, res, next ) );

export { operationRouter };
