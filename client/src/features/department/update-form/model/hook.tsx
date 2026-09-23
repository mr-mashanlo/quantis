import { useClose } from '@headlessui/react';
import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { type Department, type UpdateDepartmentDTO, useUpdateDepartment } from '@/entities/department';
import { mapServerErrors } from '@/shared/libs';

export const useUpdateDepartmentForm = ( department: Department ) => {
  const close = useClose();
  const { update } = useUpdateDepartment();

  const form = useForm( {
    defaultValues: {
      name: department.name
    } as UpdateDepartmentDTO,

    onSubmit: async ( { value, formApi } ) => {
      try {
        await update.mutateAsync( { id: department.id, data: value } );
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
