import { prisma } from '../../config/db.js';
import { OperationController } from './controller.js';
import { OperationRepository } from './repository.js';
import { OperationService } from './service.js';

export const operationRepository = new OperationRepository( prisma );
export const operationService = new OperationService( operationRepository );
export const operationController = new OperationController( operationService );
