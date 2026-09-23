import { useMutation, useQueryClient } from '@tanstack/react-query';

import { medicationService } from '../api/api';
import { type UpdateMedicationDTO } from './schema';

export const useUpdateMedication = () => {
  const queryClient = useQueryClient();

  const update = useMutation( {
    mutationFn: ( { id, data }: { id: string, data: UpdateMedicationDTO } ) => medicationService.updateMedication( id, data ),
    onSuccess: () => queryClient.invalidateQueries( { queryKey: [ 'medications' ] } )
  } );

  return { update };
};
