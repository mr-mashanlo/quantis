import { useSelector } from '@tanstack/react-form';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent } from 'react';
import { twMerge } from 'tailwind-merge';

import { CreateMedicationSchema } from '@/entities/medication';
import { Button } from '@/shared/ui/button';
import { TextInput } from '@/shared/ui/form';

import { useCreateMedicationForm } from '../model/hook';

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export const CreateMedicationForm: FC<Props> = ( { className, ...props } ) => {
  const form = useCreateMedicationForm();
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
      <h3 className="mb-5 text-xl text-center font-bold">Create medication</h3>
      <div className="grid gap-4 sm:gap-5">
        <form.Field name="name" validators={{ onChange: CreateMedicationSchema.shape.name }}>
          {field => <TextInput icon="type-outline" type="text" placeholder="Name" name={field.name} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
        </form.Field>
        <form.Field name="unit" validators={{ onChange: CreateMedicationSchema.shape.unit }}>
          {field => <TextInput icon="type-outline" type="number" placeholder="Unit" name={field.name} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
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

export default CreateMedicationForm;
