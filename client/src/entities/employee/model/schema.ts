import { z } from 'zod';

import { type PaginatedResponse } from '@/shared/types';

export const EmployeeSchema = z.object( {
  id: z.string(),
  name: z.string().min( 3, 'Name must be ≥ 3 characters' ),
  role: z.enum( [ 'ADMIN', 'DOCTOR', 'PHARMACIST', 'NURSE' ], 'Role has invalid value' ),
  createdAt: z.string(),
  archived: z.boolean()
} );

export const CreateEmployeeSchema = EmployeeSchema.omit( { id: true, createdAt: true, archived: true } );

export const UpdateEmployeeSchema = EmployeeSchema.omit( { id: true, createdAt: true } );

export type Employee = z.infer<typeof EmployeeSchema>;

export type CreateEmployeeDTO = z.infer<typeof CreateEmployeeSchema>;

export type UpdateEmployeeDTO = z.infer<typeof UpdateEmployeeSchema>;

export type PaginatedEmployee = PaginatedResponse<Employee>
