import { z } from 'zod';

import { type PaginatedResponse } from '@/shared/types';

const OperationSchema = z.object( {
  id: z.string(),
  status: z.enum( [ 'DRAFT', 'COMPLETED', 'CANCELLED' ], 'Status has invalid value' ),
  fromDepartment: z.object( {
    id: z.string(),
    name: z.string()
  } ),
  fromDepartmentId: z.string(),
  toDepartment: z.object( {
    id: z.string(),
    name: z.string()
  } ),
  toDepartmentId: z.string().optional(),
  toPatient: z.object( {
    id: z.string(),
    name: z.string()
  } ),
  toPatientId: z.string().optional(),
  createdAt: z.string(),
  createdById: z.string()
} );

export const CreateOperationFormSchema = z.object( {
  fromDepartment: z.object( { id: z.string() } ),
  toDepartment: z.object( { id: z.string() } ).optional(),
  toPatient: z.object( { id: z.string() } ).optional()
} );

export const CreateOperationSchema = OperationSchema.omit( { id: true, fromDepartment: true, toDepartment: true, toPatient: true, createdAt: true, createdById: true } );

export const UpdateOperationSchema = OperationSchema.omit( { id: true, fromDepartment: true, toDepartment: true, toPatient: true, createdAt: true, createdById: true } );

export type Operation = z.infer<typeof OperationSchema>;

export type CreateOperationFormDTO = z.infer<typeof CreateOperationFormSchema>;

export type CreateOperationDTO = z.infer<typeof CreateOperationSchema>;

export type UpdateOperationDTO = z.infer<typeof UpdateOperationSchema>;

export type PaginatedOperation = PaginatedResponse<Operation>
