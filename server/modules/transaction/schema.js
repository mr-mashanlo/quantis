import { z } from 'zod';

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

export const PaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 )
} );
