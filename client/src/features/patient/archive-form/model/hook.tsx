import { useClose } from '@headlessui/react';
import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { type Patient, type UpdatePatientDTO, useUpdatePatient } from '@/entities/patient';
import { mapServerErrors } from '@/shared/libs';

export const useUpdatePatientForm = ( patient: Patient ) => {
  const close = useClose();
  const { update } = useUpdatePatient();

  const form = useForm( {
    defaultValues: {
      name: patient.name,
      archived: !patient.archived
    } as UpdatePatientDTO,

    onSubmit: async ( { value, formApi } ) => {
      try {
        await update.mutateAsync( { id: patient.id, data: value } );
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
