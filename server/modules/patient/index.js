import { prisma } from '../../config/db.js';
import { PatientController } from './controller.js';
import { PatientRepository } from './repository.js';
import { PatientService } from './service.js';

export const patientRepository = new PatientRepository( prisma );
export const patientService = new PatientService( patientRepository );
export const patientController = new PatientController( patientService );
