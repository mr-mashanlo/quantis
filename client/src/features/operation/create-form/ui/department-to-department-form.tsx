import { Button, Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Field } from '@headlessui/react';
import { useSelector } from '@tanstack/react-form';
import { ChevronDown, Hospital, OctagonAlert } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type ReactNode, type SubmitEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useDepartments } from '@/entities/department';
import { CreateOperationFormSchema } from '@/entities/operation';

import { useCreateOperationForm } from '../model/hook';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  description?: ReactNode
}

export const DepartmentToDepartmentForm: FC<Props> = ( { className, description = 'Lorem ipsum dolor sit amet', ...props } ) => {
  const form = useCreateOperationForm();
  const { departments } = useDepartments( { limit: '10000' } );
  const { canSubmit, isSubmitting } = useSelector( form.store, state => state );
  const [ departmentQuery, setDepartmentQuery ] = useState( '' );

  const handleFormSubmit = ( e: SubmitEvent<HTMLFormElement> ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const filteredDepartments = departmentQuery === '' ? departments.data?.data : departments.data?.data.filter( department => department.name?.toLowerCase().includes( departmentQuery.toLowerCase() ) );

  return (
    <form onSubmit={handleFormSubmit} className={twMerge( 'w-full sm:w-165 relative', className )} {...props}>
      <h3 className="mb-5 text-xl text-center font-bold">Create operation</h3>
      <div className="w-full sm:w-90 mx-auto grid gap-4 sm:gap-5">
        <form.Field name="fromDepartment" validators={{ onChange: CreateOperationFormSchema.shape.fromDepartment }}>
          {field =>
            <Field className="block relative">
              <Combobox value={field.state.value ?? null} onChange={e => e ? field.handleChange( e ) : null} onClose={() => setDepartmentQuery( '' )}>
                <ComboboxInput displayValue={( user: { name: string } ) => user?.name} onChange={e => setDepartmentQuery( e.target.value )} placeholder="From" className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" />
                <ComboboxOptions anchor="bottom" className="w-(--input-width) p-1 z-10 bg-white dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-800/50 transition duration-300 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
                  {filteredDepartments?.map( department => <ComboboxOption key={department.id} value={department} className="w-full px-3 py-2 flex items-center gap-2 rounded-md cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-950">{department.name}</ComboboxOption> )}
                </ComboboxOptions>
              </Combobox>
              {!field.state.meta.isValid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <Hospital className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
              <ChevronDown className="w-4 h-4 stroke-zinc-300 absolute top-1/2 right-4 -translate-y-1/2" />
            </Field>
          }
        </form.Field>
        <form.Field name="toDepartment" validators={{ onChange: CreateOperationFormSchema.shape.toDepartment }}>
          {field =>
            <Field className="block relative">
              <Combobox value={field.state.value ?? null} onChange={e => e ? field.handleChange( e ) : null} onClose={() => setDepartmentQuery( '' )}>
                <ComboboxInput displayValue={( user: { name: string } ) => user?.name} onChange={e => setDepartmentQuery( e.target.value )} placeholder="To" className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" />
                <ComboboxOptions anchor="bottom" className="w-(--input-width) p-1 z-10 bg-white dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-800/50 transition duration-300 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
                  {filteredDepartments?.map( department => <ComboboxOption key={department.id} value={department} className="w-full px-3 py-2 flex items-center gap-2 rounded-md cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-950">{department.name}</ComboboxOption> )}
                </ComboboxOptions>
              </Combobox>
              {!field.state.meta.isValid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <Hospital className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
              <ChevronDown className="w-4 h-4 stroke-zinc-300 absolute top-1/2 right-4 -translate-y-1/2" />
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
        {!canSubmit && !isSubmitting ?
          <p className=" text-red-600">Data has invalid value</p> :
          <p>{description}</p>
        }
      </div>
    </form>
  );
};

export default DepartmentToDepartmentForm;
