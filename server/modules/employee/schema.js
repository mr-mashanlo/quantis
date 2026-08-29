import { z } from 'zod';

export const EmployeeSchema = z.object( {
  name: z.string().min( 3, 'Name must be ≥ 3 characters' ),
  role: z.enum( [ 'ADMIN', 'DOCTOR', 'PHARMACIST', 'NURSE' ], 'Role has invalid value' )
} );

export const FilteringSchema = EmployeeSchema.partial().extend( {
  search: z.preprocess(
    v => v ? v : undefined,
    z.string().optional()
  ).transform( v => ( { name: { contains: v, mode: 'insensitive' } } ) ).optional()
} );

export const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'desc' ),
  sort: z.enum( [ 'id', 'name', 'role' ] ).default( 'id' )
} );

export const PaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 )
} );
