import { useSelector } from '@tanstack/react-form';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent } from 'react';
import { twMerge } from 'tailwind-merge';

import { type Medication, UpdateMedicationSchema } from '@/entities/medication';
import { Button } from '@/shared/ui/button';
import { TextInput } from '@/shared/ui/form';

import { useUpdateMedicationForm } from '../model/hook';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  medication: Medication
};

export const UpdateMedicationForm: FC<Props> = ( { medication, className, ...props } ) => {
  const form = useUpdateMedicationForm( medication );
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
      <h3 className="mb-5 text-xl text-center font-bold">Update medication</h3>
      <div className="grid gap-4 sm:gap-5">
        <form.Field name="name" validators={{ onChange: UpdateMedicationSchema.shape.name }}>
          {field => <TextInput icon="type-outline" type="text" placeholder="Name" name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
        </form.Field>
        <form.Field name="unit" validators={{ onChange: UpdateMedicationSchema.shape.unit }}>
          {field => <TextInput icon="type-outline" type="number" placeholder="Unit" name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
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

export default UpdateMedicationForm;
