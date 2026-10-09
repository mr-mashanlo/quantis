import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { employeeController } from './index.js';
import { CreateEmployeeSchema, UpdateEmployeeSchema } from './schema.js';

const employeeRouter = Router();

employeeRouter.post( '/employees', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR' ] ), validate( CreateEmployeeSchema ), ( req, res, next ) => employeeController.createEmployee( req, res, next ) );
employeeRouter.get( '/employees', isAuth, ( req, res, next ) => employeeController.getEmployees( req, res, next ) );
employeeRouter.get( '/employees/:id', isAuth, ( req, res, next ) => employeeController.getEmployeeById( req, res, next ) );
employeeRouter.put( '/employees/:id', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR' ] ), validate( UpdateEmployeeSchema ), ( req, res, next ) => employeeController.updateEmployeeById( req, res, next ) );

export { employeeRouter };
