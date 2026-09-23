import { useClose } from '@headlessui/react';
import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';
import { useParams } from 'react-router';

import { type CreateTransactionFormDTO, useCreateTransaction } from '@/entities/transaction';
import { mapServerErrors } from '@/shared/libs';

export const useCreateTransactionForm = () => {
  const close = useClose();
  const { create } = useCreateTransaction();
  const { id } = useParams();

  const form = useForm( {
    defaultValues: {
      medication: {},
      amount: ''
    } as CreateTransactionFormDTO,

    onSubmit: async ( { value, formApi } ) => {
      try {
        await create.mutateAsync( { id: id || '', data: { medicationId: value.medication.id, amount: Number( value.amount ) } } );
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
