import { useMutation, useQueryClient } from '@tanstack/react-query';

import { transactionService } from '../api/api';
import { type CreateTransactionDTO } from './schema';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const create = useMutation( {
    mutationFn: ( { id, data }: { id: string, data: CreateTransactionDTO } ) => transactionService.createTransaction( id, data ),
    onSuccess: () => queryClient.invalidateQueries( { queryKey: [ 'transactions' ] } )
  } );

  return { create };
};
