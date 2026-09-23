import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authService } from '../api/api';
import { type CreateAuthDTO } from './schema';

export const useCreateAuth = () => {
  const queryClient = useQueryClient();

  const create = useMutation( {
    mutationFn: ( data: CreateAuthDTO ) => authService.createAuth( data ),
    onSuccess: () => queryClient.invalidateQueries( { queryKey: [ 'employees' ] } )
  } );

  return { create };
};
