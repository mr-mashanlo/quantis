import { prisma } from '../../config/db.js';
import { MedicationController } from './controller.js';
import { MedicationRepository } from './repository.js';
import { MedicationService } from './service.js';

export const medicationRepository = new MedicationRepository( prisma );
export const medicationService = new MedicationService( medicationRepository );
export const medicationController = new MedicationController( medicationService );
