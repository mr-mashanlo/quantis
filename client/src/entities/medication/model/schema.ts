import { z } from 'zod';

import { type PaginatedResponse } from '@/shared/types';

export const MedicationSchema = z.object( {
  id: z.string(),
  name: z.string().min( 3, 'Name must be ≥ 3 characters' ),
  unit: z.string(),
  createdAt: z.string(),
  createdById: z.string(),
  archived: z.boolean()
} );

export const CreateMedicationSchema = MedicationSchema.omit( { id: true, createdAt: true, createdById: true, archived: true } );

export const UpdateMedicationSchema = MedicationSchema.omit( { id: true, createdAt: true, createdById: true } );

export type Medication = z.infer<typeof MedicationSchema>;

export type CreateMedicationDTO = z.infer<typeof CreateMedicationSchema>;

export type UpdateMedicationDTO = z.infer<typeof UpdateMedicationSchema>;

export type PaginatedMedication = PaginatedResponse<Medication>
