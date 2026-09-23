import { useClose } from '@headlessui/react';
import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { type Employee, type UpdateEmployeeDTO, useUpdateEmployee } from '@/entities/employee';
import { mapServerErrors } from '@/shared/libs';

export const useUpdateEmployeeForm = ( employee: Employee ) => {
  const close = useClose();
  const { update } = useUpdateEmployee();

  const form = useForm( {
    defaultValues: {
      name: employee.name,
      role: employee.role
    } as UpdateEmployeeDTO,

    onSubmit: async ( { value, formApi } ) => {
      try {
        await update.mutateAsync( { id: employee.id, data: value } );
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
