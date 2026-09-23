import { useQuery } from '@tanstack/react-query';

import { employeeService } from '../api/api';

export const useEmployees = ( params?: Record<string, string> ) => {
  const employees = useQuery( {
    queryKey: [ 'employees', params ],
    queryFn: () => employeeService.getEmployees( params ),
    placeholderData: data => data
  } );

  return { employees };
};
