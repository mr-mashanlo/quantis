import { prisma } from '../../config/db.js';
import { BalanceController } from './controller.js';
import { BalanceRepository } from './repository.js';
import { BalanceService } from './service.js';

export const balanceRepository = new BalanceRepository( prisma );
export const balanceService = new BalanceService( balanceRepository );
export const balanceController = new BalanceController( balanceService );
