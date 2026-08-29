import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { employeeController } from './index.js';
import { EmployeeSchema } from './schema.js';

const employeeRouter = Router();

employeeRouter.post( '/employees', isAuth, checkRoles( [ 'ADMIN' ] ), validate( EmployeeSchema ), ( req, res, next ) => employeeController.createEmployee( req, res, next ) );
employeeRouter.get( '/employees', isAuth, checkRoles( [ 'ADMIN' ] ), ( req, res, next ) => employeeController.getEmployees( req, res, next ) );
employeeRouter.get( '/employees/:id', isAuth, checkRoles( [ 'ADMIN' ] ), ( req, res, next ) => employeeController.getEmployeeById( req, res, next ) );
employeeRouter.put( '/employees/:id', isAuth, checkRoles( [ 'ADMIN' ] ), validate( EmployeeSchema ), ( req, res, next ) => employeeController.updateEmployeeById( req, res, next ) );

export { employeeRouter };
