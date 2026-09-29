import { useSelector } from '@tanstack/react-form';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent } from 'react';
import { twMerge } from 'tailwind-merge';

import { type Operation, UpdateOperationSchema } from '@/entities/operation';
import { Button } from '@/shared/ui/button';
import { Listbox } from '@/shared/ui/form';

import { useUpdateOperationForm } from '../model/hook';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  operation: Operation
};

export const UpdateOperationForm: FC<Props> = ( { operation, className, ...props } ) => {
  const form = useUpdateOperationForm( operation );
  const { canSubmit, fieldMeta } = useSelector( form.store, state => state );

  const handleFormSubmit = ( e: SubmitEvent<HTMLFormElement> ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const getErrorMessages = () => {
    return Object.values( fieldMeta ).filter( field => field?.errors.length ).map( field => field?.errors.map( item => item.message ) );
  };

  return (
    <form onSubmit={handleFormSubmit} className={twMerge( 'w-full sm:w-90 relative', className )} {...props}>
      <h3 className="mb-5 text-xl text-center font-bold">Update operation</h3>
      <div className="grid gap-4 sm:gap-5">
        <form.Field name="status" validators={{ onChange: UpdateOperationSchema.shape.status }}>
          {field => <Listbox icon="info" value={field.state.value} onChange={e => field.handleChange( e as Operation['status'] )} placeholder={field.state.value} options={[ { key: 'DRAFT', value: 'DRAFT' }, { key: 'COMPLETED', value: 'COMPLETED' }, { key: 'CANCELLED', value: 'CANCELLED' } ]} />}
        </form.Field>
        <form.Subscribe selector={state => [ state.canSubmit, state.isSubmitting ]}>
          {( [ canSubmit, isSubmitting ] ) => <Button type="submit" disabled={!canSubmit}>{isSubmitting ? '•••' : 'Save'}</Button>}
        </form.Subscribe>
      </div>
      <div className="w-full mt-5 text-center absolute top-full">
        {!canSubmit ?
          <p className=" text-red-600">{getErrorMessages().join( ', ' )}</p> :
          <p>Lorem ipsum dolor sit amet</p>
        }
      </div>
    </form>
  );
};

export default UpdateOperationForm;
