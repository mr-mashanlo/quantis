import { useQuery } from '@tanstack/react-query';

import { balanceService } from '../api/api';

export const useBalances = ( params?: Record<string, string> ) => {
  const balances = useQuery( {
    queryKey: [ 'balances', params ],
    queryFn: () => balanceService.getBalances( params ),
    placeholderData: data => data
  } );

  return { balances };
};
