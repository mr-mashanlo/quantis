import { useQuery } from '@tanstack/react-query';

import { patientService } from '../api/api';

export const usePatient = ( id: string ) => {
  const patient = useQuery( {
    queryKey: [ 'patient', id ],
    queryFn: () => patientService.getPatientById( id ),
    placeholderData: data => data
  } );

  return { patient };
};
