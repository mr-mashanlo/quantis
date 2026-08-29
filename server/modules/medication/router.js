import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { validate } from '../../middlewares/validate.js';
import { medicationController } from './index.js';
import { MedicationSchema } from './schema.js';

const medicationRouter = Router();

medicationRouter.post( '/medications', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR', 'PHARMACIST' ] ), validate( MedicationSchema ), ( req, res, next ) => medicationController.createMedication( req, res, next ) );
medicationRouter.get( '/medications', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR', 'PHARMACIST' ] ), ( req, res, next ) => medicationController.getMedications( req, res, next ) );
medicationRouter.get( '/medications/:id', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR', 'PHARMACIST' ] ), ( req, res, next ) => medicationController.getMedicationById( req, res, next ) );
medicationRouter.put( '/medications/:id', isAuth, checkRoles( [ 'ADMIN', 'DOCTOR', 'PHARMACIST' ] ), validate( MedicationSchema ), ( req, res, next ) => medicationController.updateMedicationById( req, res, next ) );

export { medicationRouter };
