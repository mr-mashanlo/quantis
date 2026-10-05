import { z } from 'zod';
export { PaginationSchema } from '../../shared/types/pagination.js';

export const TransactionSchema = z.object( {
  amount: z.number().positive(),
  medicationId: z.string()
} );

export const FilteringSchema = TransactionSchema.extend( {
  operationId: z.string(),
  toDepartmentId: z.string(),
  toPatientId: z.string()
} ).partial();

export const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'desc' ),
  sort: z.enum( [ 'id', 'type', 'amount', 'medicationId', 'createdAt' ] ).default( 'id' )
} );
