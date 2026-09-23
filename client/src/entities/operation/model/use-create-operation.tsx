import { useMutation, useQueryClient } from '@tanstack/react-query';

import { operationService } from '../api/api';
import { type CreateOperationDTO } from './schema';

export const useCreateOperation = () => {
  const queryClient = useQueryClient();

  const create = useMutation( {
    mutationFn: ( data: CreateOperationDTO ) => operationService.createOperation( data ),
    onSuccess: () => queryClient.invalidateQueries( { queryKey: [ 'operations' ] } )
  } );

  return { create };
};
