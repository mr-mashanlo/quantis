import { z } from 'zod';

export const MedicationSchema = z.object( {
  name: z.string().min( 3, 'Name must be ≥ 3 characters' ),
  unit: z.string()
} );

export const FilteringSchema = MedicationSchema.partial().extend( {
  search: z.preprocess(
    v => v ? v : undefined,
    z.string().optional()
  ).transform( v => ( { name: { contains: v, mode: 'insensitive' } } ) ).optional()
} );

export const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'desc' ),
  sort: z.enum( [ 'id', 'name', 'unit' ] ).default( 'id' )
} );

export const PaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 )
} );
