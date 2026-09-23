import { useQuery } from '@tanstack/react-query';

import { departmentService } from '../api/api';

export const useDepartments = ( params?: Record<string, string> ) => {
  const departments = useQuery( {
    queryKey: [ 'departments', params ],
    queryFn: () => departmentService.getDepartments( params ),
    placeholderData: data => data
  } );

  return { departments };
};
