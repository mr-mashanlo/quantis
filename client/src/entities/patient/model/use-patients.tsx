import { useQuery } from '@tanstack/react-query';

import { patientService } from '../api/api';

export const usePatients = ( params?: Record<string, string> ) => {
  const patients = useQuery( {
    queryKey: [ 'patients', params ],
    queryFn: () => patientService.getPatients( params ),
    placeholderData: data => data
  } );

  return { patients };
};
