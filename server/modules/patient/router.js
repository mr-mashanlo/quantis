import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { patientController } from './index.js';
import { CreatePatientSchema, UpdatePatientSchema } from './schema.js';

const patientRouter = Router();

patientRouter.post( '/patients', isAuth, checkRoles( [ 'ADMIN' ] ), validate( CreatePatientSchema ), ( req, res, next ) => patientController.createPatient( req, res, next ) );
patientRouter.get( '/patients', isAuth, checkRoles( [ 'ADMIN' ] ), ( req, res, next ) => patientController.getPatients( req, res, next ) );
patientRouter.get( '/patients/:id', isAuth, checkRoles( [ 'ADMIN' ] ), ( req, res, next ) => patientController.getPatientById( req, res, next ) );
patientRouter.put( '/patients/:id', isAuth, checkRoles( [ 'ADMIN' ] ), validate( UpdatePatientSchema ), ( req, res, next ) => patientController.updatePatientById( req, res, next ) );

export { patientRouter };
