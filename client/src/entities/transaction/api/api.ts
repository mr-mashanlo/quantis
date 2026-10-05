import { kyInstance } from '@/shared/libs';

import { type PaginatedTransaction } from '../model/schema';

class TransactionService {

  getTransactions = ( searchParams?: Record<string, string> ): Promise<PaginatedTransaction> => {
    return kyInstance.get( 'transactions', { searchParams } ).json();
  };

}

export const transactionService = new TransactionService();
