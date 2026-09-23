import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patientService } from '../api/api';
import { type UpdatePatientDTO } from './schema';

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  const update = useMutation( {
    mutationFn: ( { id, data }: { id: string, data: UpdatePatientDTO } ) => patientService.updatePatient( id, data ),
    onSuccess: () => queryClient.invalidateQueries( { queryKey: [ 'patients' ] } )
  } );

  return { update };
};
