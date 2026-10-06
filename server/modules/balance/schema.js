import { z } from 'zod';
export { PaginationSchema } from '../../shared/types/pagination.js';

export const CreateBalanceSchema = z.object( {
  operationId: z.string(),
  departmentId: z.string(),
  medicationId: z.string(),
  amount: z.number()
} );

export const FilteringSchema = CreateBalanceSchema.partial();

export const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'desc' ),
  sort: z.enum( [ 'id', 'operationId', 'departmentId', 'medicationId', 'amount' ] ).default( 'id' )
} );
