import { kyInstance } from '@/shared/libs';

import { type CreateTransactionDTO, type PaginatedTransaction, type Transaction, type UpdateTransactionDTO } from '../model/schema';

class TransactionService {

  createTransaction = ( id: string, data: CreateTransactionDTO ): Promise<Transaction> => {
    return kyInstance.post( `operations/${id}`, { json: data } ).json();
  };

  deleteTransaction = ( id: string ): Promise<Transaction> => {
    return kyInstance.delete( `transactions/${id}` ).json();
  };

  getTransactions = ( searchParams?: Record<string, string> ): Promise<PaginatedTransaction> => {
    return kyInstance.get( 'transactions', { searchParams } ).json();
  };

  getTransactionById = ( id: string ): Promise<Transaction> => {
    return kyInstance.get( `transactions/${id}` ).json();
  };

  updateTransaction = ( id: string, data: UpdateTransactionDTO ): Promise<Transaction> => {
    return kyInstance.put( `transactions/${id}`, { json: data } ).json();
  };

}

export const transactionService = new TransactionService();
