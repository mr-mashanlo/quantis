import { prisma } from '../../config/db.js';
import { TransactionController } from './controller.js';
import { TransactionRepository } from './repository.js';
import { TransactionService } from './service.js';

export const transactionRepository = new TransactionRepository( prisma );
export const transactionService = new TransactionService( prisma, transactionRepository );
export const transactionController = new TransactionController( transactionService );
