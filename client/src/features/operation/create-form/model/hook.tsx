import { useClose } from '@headlessui/react';
import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { type CreateOperationFormDTO, useCreateOperation } from '@/entities/operation';
import { mapServerErrors } from '@/shared/libs';

export const useCreateOperationForm = () => {
  const close = useClose();
  const { create } = useCreateOperation();

  const form = useForm( {
    defaultValues: {
      fromDepartment: {},
      toDepartment: {},
      toPatient: {}
    } as CreateOperationFormDTO,

    onSubmit: async ( { value, formApi } ) => {
      try {
        await create.mutateAsync( {
          status: 'DRAFT',
          fromDepartmentId: value.fromDepartment.id,
          toDepartmentId: value.toDepartment?.id,
          toPatientId: value.toPatient?.id
        } );
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
