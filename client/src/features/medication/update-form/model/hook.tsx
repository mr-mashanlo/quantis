import { useClose } from '@headlessui/react';
import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { type Medication, type UpdateMedicationDTO, useUpdateMedication } from '@/entities/medication';
import { mapServerErrors } from '@/shared/libs';

export const useUpdateMedicationForm = ( medication: Medication ) => {
  const close = useClose();
  const { update } = useUpdateMedication();

  const form = useForm( {
    defaultValues: {
      name: medication.name,
      unit: medication.unit
    } as UpdateMedicationDTO,

    onSubmit: async ( { value, formApi } ) => {
      try {
        await update.mutateAsync( { id: medication.id, data: value } );
        form.reset();
        close();
      } catch ( error ) {
        if ( error instanceof HTTPError ) {
          formApi.setErrorMap( { onChange: { fields: mapServerErrors( error.data.errors ) } } );
        }
      }
    }
  } );

  return form;
};
