import { kyInstance } from '@/shared/libs';

import { type CreateDepartmentDTO, type Department, type PaginatedDepartment, type UpdateDepartmentDTO } from '../model/schema';

class DepartmentService {

  createDepartment = ( data: CreateDepartmentDTO ): Promise<Department> => {
    return kyInstance.post( 'departments', { json: data } ).json();
  };

  deleteDepartment = ( id: string ): Promise<Department> => {
    return kyInstance.delete( `departments/${id}` ).json();
  };

  getDepartments = ( searchParams?: Record<string, string> ): Promise<PaginatedDepartment> => {
    return kyInstance.get( 'departments', { searchParams } ).json();
  };

  getDepartmentById = ( id: string ): Promise<Department> => {
    return kyInstance.get( `departments/${id}` ).json();
  };

  updateDepartment = ( id: string, data: UpdateDepartmentDTO ): Promise<Department> => {
    return kyInstance.put( `departments/${id}`, { json: data } ).json();
  };

}

export const departmentService = new DepartmentService();
