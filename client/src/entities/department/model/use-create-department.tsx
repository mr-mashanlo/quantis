import { useMutation, useQueryClient } from '@tanstack/react-query';

import { departmentService } from '../api/api';
import { type CreateDepartmentDTO } from './schema';

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  const create = useMutation( {
    mutationFn: ( data: CreateDepartmentDTO ) => departmentService.createDepartment( data ),
    onSuccess: () => queryClient.invalidateQueries( { queryKey: [ 'departments' ] } )
  } );

  return { create };
};
