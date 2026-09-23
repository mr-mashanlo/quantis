import { kyInstance } from '@/shared/libs';

import { type CreateEmployeeDTO, type Employee, type PaginatedEmployee, type UpdateEmployeeDTO } from '../model/schema';

class EmployeeService {

  createEmployee = ( data: CreateEmployeeDTO ): Promise<Employee> => {
    return kyInstance.post( 'employees', { json: data } ).json();
  };

  deleteEmployee = ( id: string ): Promise<Employee> => {
    return kyInstance.delete( `employees/${id}` ).json();
  };

  getEmployees = ( searchParams?: Record<string, string> ): Promise<PaginatedEmployee> => {
    return kyInstance.get( 'employees', { searchParams } ).json();
  };

  getEmployeeById = ( id: string ): Promise<Employee> => {
    return kyInstance.get( `employees/${id}` ).json();
  };

  updateEmployee = ( id: string, data: UpdateEmployeeDTO ): Promise<Employee> => {
    return kyInstance.put( `employees/${id}`, { json: data } ).json();
  };

}

export const employeeService = new EmployeeService();
