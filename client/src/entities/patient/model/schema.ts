import { z } from 'zod';

import { type PaginatedResponse } from '@/shared/types';

export const PatientSchema = z.object( {
  id: z.string(),
  name: z.string().min( 3, 'Name must be ≥ 3 characters' ),
  createdAt: z.string(),
  createdById: z.string(),
  archived: z.boolean()
} );

export const CreatePatientSchema = PatientSchema.omit( { id: true, createdAt: true, createdById: true, archived: true } );

export const UpdatePatientSchema = PatientSchema.omit( { id: true, createdAt: true, createdById: true } );

export type Patient = z.infer<typeof PatientSchema>;

export type CreatePatientDTO = z.infer<typeof CreatePatientSchema>;

export type UpdatePatientDTO = z.infer<typeof UpdatePatientSchema>;

export type PaginatedPatient = PaginatedResponse<Patient>
