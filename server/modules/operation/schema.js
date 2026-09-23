import { z } from 'zod';

const BaseSchema = z.object( {
  status: z.enum( [ 'DRAFT', 'COMPLETED', 'CANCELLED' ], 'Status has invalid value' ),
  fromDepartmentId: z.string()
} );

export const CreateOperationSchema = z.union( [
  BaseSchema.extend( {
    toDepartmentId: z.string()
  } ),
  BaseSchema.extend( {
    toPatientId: z.string()
  } )
] );

export const UpdateOperationSchema = z.object( {
  status: z.enum( [ 'DRAFT', 'COMPLETED', 'CANCELLED' ], 'Status has invalid value' )
} );

export const FilteringSchema = BaseSchema.extend( {
  toDepartmentId: z.string(),
  toPatientId: z.string()
} ).partial();

export const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'desc' ),
  sort: z.enum( [ 'id', 'status', 'fromDepartmentId', 'toDepartmentId', 'toPatientId', 'createdAt' ] ).default( 'id' )
} );

export const PaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 )
} );
