import { useMutation, useQueryClient } from '@tanstack/react-query';

import { medicationService } from '../api/api';
import { type CreateMedicationDTO } from './schema';

export const useCreateMedication = () => {
  const queryClient = useQueryClient();

  const create = useMutation( {
    mutationFn: ( data: CreateMedicationDTO ) => medicationService.createMedication( data ),
    onSuccess: () => queryClient.invalidateQueries( { queryKey: [ 'medications' ] } )
  } );

  return { create };
};
