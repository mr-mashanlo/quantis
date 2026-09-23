import { kyInstance } from '@/shared/libs';

import { type CreatePatientDTO, type PaginatedPatient, type Patient, type UpdatePatientDTO } from '../model/schema';

class PatientService {

  createPatient = ( data: CreatePatientDTO ): Promise<Patient> => {
    return kyInstance.post( 'patients', { json: data } ).json();
  };

  deletePatient = ( id: string ): Promise<Patient> => {
    return kyInstance.delete( `patients/${id}` ).json();
  };

  getPatients = ( searchParams?: Record<string, string> ): Promise<PaginatedPatient> => {
    return kyInstance.get( 'patients', { searchParams } ).json();
  };

  getPatientById = ( id: string ): Promise<Patient> => {
    return kyInstance.get( `patients/${id}` ).json();
  };

  updatePatient = ( id: string, data: UpdatePatientDTO ): Promise<Patient> => {
    return kyInstance.put( `patients/${id}`, { json: data } ).json();
  };

}

export const patientService = new PatientService();
