import { kyInstance } from '@/shared/libs';

import { type PaginatedBalance } from '../model/schema';

class BalanceService {

  getBalances = ( searchParams?: Record<string, string> ): Promise<PaginatedBalance> => {
    return kyInstance.get( 'balances', { searchParams } ).json();
  };

}

export const balanceService = new BalanceService();
