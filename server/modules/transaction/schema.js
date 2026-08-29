import { z } from 'zod';

const BaseTransaction = z.object( {
  amount: z.number().positive(),
  medicationId: z.string(),
  fromDepartmentId: z.string()
} );

export const TransactionSchema = z.union( [
  BaseTransaction.extend( {
    toDepartmentId: z.string(),
    toPatientId: z.undefined().optional()
  } ),
  BaseTransaction.extend( {
    toPatientId: z.string(),
    toDepartmentId: z.undefined().optional()
  } )
] );

export const FilteringSchema = BaseTransaction.partial().extend( {
  operationId: z.string().optional()
} );

export const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'desc' ),
  sort: z.enum( [ 'id', 'amount', 'medicationId', 'fromDepartmentId', 'toDepartmentId', 'toPatientId' ] ).default( 'id' )
} );

export const PaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 )
} );
