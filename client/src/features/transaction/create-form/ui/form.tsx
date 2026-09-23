import { Button, Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Input } from '@headlessui/react';
import { useSelector } from '@tanstack/react-form';
import { ChevronDown, OctagonAlert, Package2, Pill } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useMedications } from '@/entities/medication';
import { CreateTransactionFormSchema } from '@/entities/transaction';

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

  const getErrorMessages = () => {
    return Object.values( fieldMeta ).filter( field => field?.errors.length ).map( field => field?.errors.map( item => item.message ) );
  };

  return (
    <form onSubmit={handleFormSubmit} className={twMerge( 'w-full sm:w-165 relative', className )} {...props}>
      <h3 className="mb-5 text-xl text-center font-bold">Create transaction</h3>
      <div className="w-full sm:w-90 mx-auto grid gap-4 sm:gap-5">
        <form.Field name="medication" validators={{ onChange: CreateTransactionFormSchema.shape.medication }}>
          {field =>
            <Field className="block relative">
              <Combobox value={field.state.value ?? null} onChange={e => e ? field.handleChange( e ) : null} onClose={() => setMedicationQuery( '' )}>
                <ComboboxInput displayValue={( user: { name: string } ) => user?.name} onChange={e => setMedicationQuery( e.target.value )} placeholder="Name" className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" />
                <ComboboxOptions anchor="bottom" className="w-(--input-width) p-1 z-10 bg-white dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-800/50 transition duration-300 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
                  {filteredMedications?.map( medication => <ComboboxOption key={medication.id} value={medication} className="w-full px-3 py-2 flex items-center gap-2 rounded-md cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-950">{medication.name}</ComboboxOption> )}
                </ComboboxOptions>
              </Combobox>
              {!field.state.meta.isValid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <Pill className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
              <ChevronDown className="w-4 h-4 stroke-zinc-300 absolute top-1/2 right-4 -translate-y-1/2" />
            </Field>
          }
        </form.Field>
        <form.Field name="amount" validators={{ onChange: CreateTransactionFormSchema.shape.amount }}>
          {field =>
            <Field className="block relative">
              <Input type="number" name={field.name} onChange={e => field.handleChange( e.target.value )} onWheel={e => e.currentTarget.blur()} min="1" data-error={field.state.meta.isValid ? false : true} placeholder="Transaction" className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" />
              {!field.state.meta.isValid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <Package2 className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
            </Field>
          }
        </form.Field>
        <form.Subscribe selector={state => [ state.canSubmit, state.isSubmitting ]}>
          {( [ canSubmit, isSubmitting ] ) =>
            <Button disabled={!canSubmit} type="submit" className="w-full p-4 rounded-xl bg-black dark:bg-white text-white dark:text-black cursor-pointer outline-offset-3 disabled:cursor-default disabled:opacity-70">{isSubmitting ? '•••' : 'Save'}</Button>
          }
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
