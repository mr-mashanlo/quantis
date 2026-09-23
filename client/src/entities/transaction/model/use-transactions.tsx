import { useQuery } from '@tanstack/react-query';

import { transactionService } from '../api/api';

export const useTransactions = ( params?: Record<string, string> ) => {
  const transactions = useQuery( {
    queryKey: [ 'transactions', params ],
    queryFn: () => transactionService.getTransactions( params ),
    placeholderData: data => data
  } );

  return { transactions };
};
