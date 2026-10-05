import { useSelector } from '@tanstack/react-form';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent } from 'react';
import { twMerge } from 'tailwind-merge';

import { type Department, UpdateDepartmentSchema } from '@/entities/department';
import { Button } from '@/shared/ui/button';
import { TextInput } from '@/shared/ui/form';

import { useUpdateDepartmentForm } from '../model/hook';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  department: Department
};

export const UpdateDepartmentForm: FC<Props> = ( { department, className, ...props } ) => {
  const form = useUpdateDepartmentForm( department );
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
      <h3 className="mb-5 text-xl text-center font-bold">Update department</h3>
      <div className="grid gap-4 sm:gap-5">
        <form.Field name="name" validators={{ onChange: UpdateDepartmentSchema.shape.name }}>
          {field => <TextInput icon="type-outline" type="text" placeholder="Name" name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
        </form.Field>
        <form.Subscribe>
          {state => <Button type="submit" disabled={!state.canSubmit}>{state.isSubmitting ? '•••' : 'Save'}</Button>}
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

export default UpdateDepartmentForm;
