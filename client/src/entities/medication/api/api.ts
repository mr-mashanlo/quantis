import { kyInstance } from '@/shared/libs';

import { type CreateMedicationDTO, type Medication, type PaginatedMedication, type UpdateMedicationDTO } from '../model/schema';

class MedicationService {

  createMedication = ( data: CreateMedicationDTO ): Promise<Medication> => {
    return kyInstance.post( 'medications', { json: data } ).json();
  };

  deleteMedication = ( id: string ): Promise<Medication> => {
    return kyInstance.delete( `medications/${id}` ).json();
  };

  getMedications = ( searchParams?: Record<string, string> ): Promise<PaginatedMedication> => {
    return kyInstance.get( 'medications', { searchParams } ).json();
  };

  getMedicationById = ( id: string ): Promise<Medication> => {
    return kyInstance.get( `medications/${id}` ).json();
  };

  updateMedication = ( id: string, data: UpdateMedicationDTO ): Promise<Medication> => {
    return kyInstance.put( `medications/${id}`, { json: data } ).json();
  };

}

export const medicationService = new MedicationService();
