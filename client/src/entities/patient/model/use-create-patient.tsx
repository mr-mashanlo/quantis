import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patientService } from '../api/api';
import { type CreatePatientDTO } from './schema';

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  const create = useMutation( {
    mutationFn: ( data: CreatePatientDTO ) => patientService.createPatient( data ),
    onSuccess: () => queryClient.invalidateQueries( { queryKey: [ 'patients' ] } )
  } );

  return { create };
};
