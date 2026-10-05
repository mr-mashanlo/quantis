import { prisma } from '../../config/db.js';
import { transactionRepository } from '../transaction/index.js';
import { OperationController } from './controller.js';
import { OperationRepository } from './repository.js';
import { OperationService } from './service.js';

export const operationRepository = new OperationRepository( prisma );
export const operationService = new OperationService( prisma, operationRepository, transactionRepository );
export const operationController = new OperationController( operationService );
