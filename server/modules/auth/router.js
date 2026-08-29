import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { authController } from './index.js';
import { CreateUserSchema, SignInSchema, SignUpSchema } from './schema.js';

const authRouter = Router();

authRouter.post( '/auth/create', isAuth, checkRoles( [ 'ADMIN' ] ), validate( CreateUserSchema ), ( req, res, next ) => authController.createUser( req, res, next ) );
authRouter.post( '/auth/signin', validate( SignInSchema ), ( req, res, next ) => authController.signIn( req, res, next ) );
authRouter.post( '/auth/signup', validate( SignUpSchema ), ( req, res, next ) => authController.signUp( req, res, next ) );

export { authRouter };
