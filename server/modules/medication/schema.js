import { z } from 'zod';
export { PaginationSchema } from '../../shared/types/pagination.js';

export const CreateMedicationSchema = z.object( {
  name: z.string().min( 3, 'Name must be ≥ 3 characters' ),
  unit: z.string()
} );

export const UpdateMedicationSchema = CreateMedicationSchema.extend( {
  archived: z.boolean()
} );

export const FilteringSchema = CreateMedicationSchema.partial().extend( {
  search: z.preprocess( v => v ? v : undefined, z.string().optional() ).transform( v => ( { name: { contains: v, mode: 'insensitive' } } ) ).optional()
} );

export const SortingSchema = z.object( {
  order: z.enum( [ 'asc', 'desc' ] ).default( 'desc' ),
  sort: z.enum( [ 'id', 'name', 'unit', 'archived' ] ).default( 'id' )
} );
