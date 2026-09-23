import { useQuery } from '@tanstack/react-query';

import { operationService } from '../api/api';

export const useOperation = ( id: string ) => {
  const operation = useQuery( {
    queryKey: [ 'operation', id ],
    queryFn: () => operationService.getOperationById( id ),
    placeholderData: data => data
  } );

  return { operation };
};
