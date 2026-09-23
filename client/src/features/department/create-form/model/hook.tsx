import { useClose } from '@headlessui/react';
import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { type CreateDepartmentDTO, useCreateDepartment } from '@/entities/department';
import { mapServerErrors } from '@/shared/libs';

export const useCreateDepartmentForm = () => {
  const close = useClose();
  const { create } = useCreateDepartment();

  const form = useForm( {
    onSubmit: async ( { value, formApi } ) => {
      try {
        await create.mutateAsync( value as CreateDepartmentDTO );
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
