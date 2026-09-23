import { useClose } from '@headlessui/react';
import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { type CreatePatientDTO, useCreatePatient } from '@/entities/patient';
import { mapServerErrors } from '@/shared/libs';

export const useCreatePatientForm = () => {
  const close = useClose();
  const { create } = useCreatePatient();

  const form = useForm( {
    onSubmit: async ( { value, formApi } ) => {
      try {
        await create.mutateAsync( value as CreatePatientDTO );
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
