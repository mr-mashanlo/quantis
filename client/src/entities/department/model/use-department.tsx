import { useQuery } from '@tanstack/react-query';

import { departmentService } from '../api/api';

export const useDepartment = ( id: string ) => {
  const department = useQuery( {
    queryKey: [ 'department', id ],
    queryFn: () => departmentService.getDepartmentById( id ),
    placeholderData: data => data
  } );

  return { department };
};
