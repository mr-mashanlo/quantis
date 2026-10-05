import { z } from 'zod';
export { PaginationSchema } from '../../shared/types/pagination.js';

export const CreatePatientSchema = z.object( {
  name: z.string().min( 3, 'Name must be ≥ 3 characters' )
} );

export const UpdatePatientSchema = CreatePatientSchema.extend( {
  archived: z.boolean()
} );

export const FilteringSchema = CreatePatientSchema.partial().extend( {
  search: z.preprocess( v => v ? v : undefined, z.string().optional() ).transform( v => ( { name: { contains: v, mode: 'insensitive' } } ) ).optional()
} );

export const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'desc' ),
  sort: z.enum( [ 'id', 'name', 'role', 'archived' ] ).default( 'id' )
} );
