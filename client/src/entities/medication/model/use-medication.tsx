import { useQuery } from '@tanstack/react-query';

import { medicationService } from '../api/api';

export const useMedication = ( id: string ) => {
  const medication = useQuery( {
    queryKey: [ 'medication', id ],
    queryFn: () => medicationService.getMedicationById( id ),
    placeholderData: data => data
  } );

  return { medication };
};
