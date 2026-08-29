import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { departmentController } from './index.js';
import { DepartmentSchema } from './schema.js';

const departmentRouter = Router();

departmentRouter.post( '/departments', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR' ] ), validate( DepartmentSchema ), ( req, res, next ) => departmentController.createDepartment( req, res, next ) );
departmentRouter.get( '/departments', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR' ] ), ( req, res, next ) => departmentController.getDepartments( req, res, next ) );
departmentRouter.get( '/departments/:id', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR' ] ), ( req, res, next ) => departmentController.getDepartmentById( req, res, next ) );
departmentRouter.put( '/departments/:id', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR' ] ), validate( DepartmentSchema ), ( req, res, next ) => departmentController.updateDepartmentById( req, res, next ) );

export { departmentRouter };
