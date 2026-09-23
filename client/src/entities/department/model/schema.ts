import { z } from 'zod';

import { type PaginatedResponse } from '@/shared/types';

export const DepartmentSchema = z.object( {
  id: z.string(),
  name: z.string().min( 3, 'Name must be ≥ 3 characters' ),
  createdAt: z.string(),
  createdById: z.string(),
  archived: z.boolean()
} );

export const CreateDepartmentSchema = DepartmentSchema.omit( { id: true, createdAt: true, createdById: true, archived: true } );

export const UpdateDepartmentSchema = DepartmentSchema.omit( { id: true, createdAt: true, createdById: true } );

export type Department = z.infer<typeof DepartmentSchema>;

export type CreateDepartmentDTO = z.infer<typeof CreateDepartmentSchema>;

export type UpdateDepartmentDTO = z.infer<typeof UpdateDepartmentSchema>;

export type PaginatedDepartment = PaginatedResponse<Department>
