import { useSelector } from '@tanstack/react-form';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useMedications } from '@/entities/medication';
import { CreateTransactionFormSchema } from '@/entities/transaction';
import { Button } from '@/shared/ui/button';
import { Combobox, ComboboxInput, TextInput } from '@/shared/ui/form';

import { useCreateTransactionForm } from '../model/hook';

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export const CreateTransactionForm: FC<Props> = ( { className, ...props } ) => {
  const form = useCreateTransactionForm();
  const { medications } = useMedications( { limit: '10000' } );
  const { canSubmit, fieldMeta } = useSelector( form.store, state => state );
  const [ medicationQuery, setMedicationQuery ] = useState( '' );

  const handleFormSubmit = ( e: SubmitEvent<HTMLFormElement> ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const filteredMedications = medicationQuery === '' ? medications.data?.data : medications.data?.data.filter( medication => medication.name?.toLowerCase().includes( medicationQuery.toLowerCase() ) );

  const mapedMedications = filteredMedications?.map( medication => ( { id: medication.id, key: 'name', value: medication.name } ) );

  const getErrorMessages = () => {
    return Object.values( fieldMeta ).filter( field => field?.errors.length ).map( field => field?.errors.map( item => item.message ) );
  };

  return (
    <form onSubmit={handleFormSubmit} className={twMerge( 'w-full sm:w-90 relative', className )} {...props}>
      <h3 className="mb-5 text-xl text-center font-bold">Create transaction</h3>
      <div className="grid gap-4 sm:gap-5">
        <form.Field name="medication" validators={{ onChange: CreateTransactionFormSchema.shape.medication }}>
          {field => <Combobox<{ id: string }, false> icon="pill" options={mapedMedications || []} value={field.state.value ?? null} onChange={e => e ? field.handleChange( e ) : null} onClose={() => setMedicationQuery( '' )} invalid={field.state.meta.isValid} input={<ComboboxInput placeholder="Medication" displayValue={data => data?.value} onChange={e => setMedicationQuery( e.target.value )} />} />}
        </form.Field>
        <form.Field name="amount" validators={{ onChange: CreateTransactionFormSchema.shape.amount }}>
          {field => <TextInput icon="package-2" type="number" min="1" placeholder="Amount" name={field.name} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
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

export default CreateTransactionForm;
