import { useMutation, useQueryClient } from '@tanstack/react-query';

import { employeeService } from '../api/api';
import { type UpdateEmployeeDTO } from './schema';

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  const update = useMutation( {
    mutationFn: ( { id, data }: { id: string, data: UpdateEmployeeDTO } ) => employeeService.updateEmployee( id, data ),
    onSuccess: () => queryClient.invalidateQueries( { queryKey: [ 'employees' ] } )
  } );

  return { update };
};
