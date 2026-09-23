import { useMutation, useQueryClient } from '@tanstack/react-query';

import { departmentService } from '../api/api';
import { type UpdateDepartmentDTO } from './schema';

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  const update = useMutation( {
    mutationFn: ( { id, data }: { id: string, data: UpdateDepartmentDTO } ) => departmentService.updateDepartment( id, data ),
    onSuccess: () => queryClient.invalidateQueries( { queryKey: [ 'departments' ] } )
  } );

  return { update };
};
