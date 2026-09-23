import { useMutation, useQueryClient } from '@tanstack/react-query';

import { operationService } from '../api/api';
import { type UpdateOperationDTO } from './schema';

export const useUpdateOperation = () => {
  const queryClient = useQueryClient();

  const update = useMutation( {
    mutationFn: ( { id, data }: { id: string, data: UpdateOperationDTO } ) => operationService.updateOperation( id, data ),
    onSuccess: () => queryClient.invalidateQueries( { queryKey: [ 'operations' ] } )
  } );

  return { update };
};
