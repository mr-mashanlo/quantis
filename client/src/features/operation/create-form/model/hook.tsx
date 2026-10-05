import { useClose } from '@headlessui/react';
import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { type CreateOperationFormDTO, useCreateOperation } from '@/entities/operation';
import { mapServerErrors } from '@/shared/libs';

export const useCreateOperationForm = ( { onSuccess, onError }: { onSuccess?: () => void, onError?: () => void } ) => {
  const close = useClose();
  const { create } = useCreateOperation();

  const form = useForm( {
    defaultValues: {
      fromDepartment: { id: '' },
      toDepartment: { id: '' },
      toPatient: { id: '' },
      transactions: []
    } as CreateOperationFormDTO,

    onSubmit: async ( { value, formApi } ) => {
      try {
        await create.mutateAsync( {
          status: 'COMPLETED',
          fromDepartmentId: value.fromDepartment.id,
          toDepartmentId: value.toDepartment?.id,
          toPatientId: value.toPatient?.id,
          transactions: value.transactions.map( transaction => ( { medicationId: transaction.medication.id, amount: Number( transaction.amount ) } ) )
        } );
        form.reset();
        close();
        onSuccess?.();
      } catch ( error ) {
        if ( error instanceof HTTPError ) {
          formApi.setErrorMap( { onChange: { fields: mapServerErrors( error.data.errors ) } } );
        }
        onError?.();
      }
    }
  } );

  return form;
};
