import { useQuery } from '@tanstack/react-query';

import { medicationService } from '../api/api';

export const useMedications = ( params?: Record<string, string> ) => {
  const medications = useQuery( {
    queryKey: [ 'medications', params ],
    queryFn: () => medicationService.getMedications( params ),
    placeholderData: data => data
  } );

  return { medications };
};
