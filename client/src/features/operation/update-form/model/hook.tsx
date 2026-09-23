import { useClose } from '@headlessui/react';
import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { type Operation, type UpdateOperationDTO, useUpdateOperation } from '@/entities/operation';
import { mapServerErrors } from '@/shared/libs';

export const useUpdateOperationForm = ( operation: Operation ) => {
  const close = useClose();
  const { update } = useUpdateOperation();

  const form = useForm( {
    defaultValues: {
      status: operation.status
    } as UpdateOperationDTO,

    onSubmit: async ( { value, formApi } ) => {
      try {
        await update.mutateAsync( { id: operation.id, data: value } );
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
