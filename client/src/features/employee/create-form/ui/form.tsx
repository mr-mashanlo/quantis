import { useSelector } from '@tanstack/react-form';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent } from 'react';
import { twMerge } from 'tailwind-merge';

import { type CreateAuthDTO, CreateAuthSchema } from '@/entities/auth';
import { Button } from '@/shared/ui/button';
import { Listbox, TextInput } from '@/shared/ui/form';

import { useCreateEmployeeForm } from '../model/hook';

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export const CreateEmployeeForm: FC<Props> = ( { className, ...props } ) => {
  const form = useCreateEmployeeForm();
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
    <form onSubmit={handleFormSubmit} className={twMerge( 'w-full sm:w-185 relative', className )} {...props}>
      <h3 className="mb-5 text-xl text-center font-bold">Create employee</h3>
      <div className="grid grid-cols-2 gap-4 sm:gap-5">
        <form.Field name="name" validators={{ onChange: CreateAuthSchema.shape.name }}>
          {field => <TextInput icon="type-outline" type="text" placeholder="Name" name={field.name} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
        </form.Field>
        <form.Field name="email" validators={{ onChange: CreateAuthSchema.shape.email }}>
          {field => <TextInput icon="at-sign" type="email" placeholder="Email" name={field.name} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
        </form.Field>
        <form.Field name="password" validators={{ onChange: CreateAuthSchema.shape.password }}>
          {field => <TextInput icon="lock" placeholder="Password" name={field.name} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
        </form.Field>
        <form.Field name="role" validators={{ onChange: CreateAuthSchema.shape.role }}>
          {field => <Listbox icon="user" value={field.state.value} onChange={e => field.handleChange( e as CreateAuthDTO['role'] )} placeholder={field.state.value} options={[ { key: 'DOCTOR', value: 'DOCTOR' }, { key: 'PHARMACIST', value: 'PHARMACIST' }, { key: 'NURSE', value: 'NURSE' } ]} />}
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

export default CreateEmployeeForm;
