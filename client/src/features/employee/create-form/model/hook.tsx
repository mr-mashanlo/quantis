import { useClose } from '@headlessui/react';
import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { type CreateAuthDTO, useCreateAuth } from '@/entities/auth';
import { mapServerErrors } from '@/shared/libs';

export const useCreateEmployeeForm = () => {
  const close = useClose();
  const { create } = useCreateAuth();

  const form = useForm( {
    defaultValues: {
      name: 'John',
      email: 'john@company.com',
      password: 'john12345',
      role: 'NURSE'
    } as CreateAuthDTO,

    onSubmit: async ( { value, formApi } ) => {
      try {
        await create.mutateAsync( value );
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
