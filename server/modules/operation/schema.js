import { z } from 'zod';
export { PaginationSchema } from '../../shared/types/pagination.js';

export const CreateOperationSchema = z.object( {
  status: z.enum( [ 'DRAFT', 'COMPLETED', 'CANCELLED' ], 'Status has invalid value' ),
  fromDepartmentId: z.string(),
  toDepartmentId: z.string().transform( v => v === '' ? null : v ),
  toPatientId: z.string().transform( v => v === '' ? null : v ),
  transactions: z.array( z.object( {
    medicationId: z.string(),
    amount: z.number().positive()
  } ) )
} );

export const UpdateOperationSchema = z.object( {
  status: z.enum( [ 'DRAFT', 'COMPLETED', 'CANCELLED' ], 'Status has invalid value' )
} );

export const FilteringSchema = CreateOperationSchema.partial();

export const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'desc' ),
  sort: z.enum( [ 'id', 'status', 'fromDepartmentId', 'toDepartmentId', 'toPatientId', 'createdAt' ] ).default( 'id' )
} );
