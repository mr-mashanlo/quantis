import { useQuery } from '@tanstack/react-query';

import { operationService } from '../api/api';

export const useOperations = ( params?: Record<string, string> ) => {
  const operations = useQuery( {
    queryKey: [ 'operations', params ],
    queryFn: () => operationService.getOperations( params ),
    placeholderData: data => data
  } );

  return { operations };
};
