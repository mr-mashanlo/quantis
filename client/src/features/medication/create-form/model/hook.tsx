import { useClose } from '@headlessui/react';
import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { type CreateMedicationDTO, useCreateMedication } from '@/entities/medication';
import { mapServerErrors } from '@/shared/libs';

export const useCreateMedicationForm = () => {
  const close = useClose();
  const { create } = useCreateMedication();

  const form = useForm( {
    onSubmit: async ( { value, formApi } ) => {
      try {
        await create.mutateAsync( value as CreateMedicationDTO );
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
