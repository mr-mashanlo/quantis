import { useQuery } from '@tanstack/react-query';

import { employeeService } from '../api/api';

export const useEmployee = ( id: string ) => {
  const employee = useQuery( {
    queryKey: [ 'employee', id ],
    queryFn: () => employeeService.getEmployeeById( id ),
    placeholderData: data => data
  } );

  return { employee };
};
