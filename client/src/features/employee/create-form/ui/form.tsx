import { Button, Field, Input, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { useSelector } from '@tanstack/react-form';
import { AtSign, ChevronDown, Eye, EyeOff, Lock, OctagonAlert, TypeOutline, User } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { CreateAuthSchema } from '@/entities/auth';

import { useCreateEmployeeForm } from '../model/hook';

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export const CreateEmployeeForm: FC<Props> = ( { className, ...props } ) => {
  const form = useCreateEmployeeForm();
  const { canSubmit, fieldMeta } = useSelector( form.store, state => state );
  const [ isPasswordVisible, setIsPasswordVisible ] = useState<boolean>( false );

  const handleFormSubmit = ( e: SubmitEvent<HTMLFormElement> ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const handlePasswordClick = () => {
    setIsPasswordVisible( prev => !prev );
  };

  const getErrorMessages = () => {
    return Object.values( fieldMeta ).filter( field => field?.errors.length ).map( field => field?.errors.map( item => item.message ) );
  };

  return (
    <form onSubmit={handleFormSubmit} className={twMerge( 'w-full sm:w-165 relative', className )} {...props}>
      <h3 className="mb-5 text-xl text-center font-bold">Create employee</h3>
      <div className="w-full sm:w-185 mx-auto grid grid-cols-2 gap-4 sm:gap-5">
        <form.Field name="name" validators={{ onChange: CreateAuthSchema.shape.name }}>
          {field =>
            <Field className="block relative">
              <Input type="text" name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} data-error={field.state.meta.isValid ? false : true} placeholder="Name" className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" />
              {!field.state.meta.isValid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <TypeOutline className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
            </Field>
          }
        </form.Field>
        <form.Field name="email" validators={{ onChange: CreateAuthSchema.shape.email }}>
          {field =>
            <Field className="block relative">
              <Input type="email" name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} data-error={field.state.meta.isValid ? false : true} placeholder="Email" className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" />
              {!field.state.meta.isValid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <AtSign className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
            </Field>
          }
        </form.Field>
        <form.Field name="password" validators={{ onChange: CreateAuthSchema.shape.password }}>
          {field =>
            <Field className="block relative">
              <Input type={isPasswordVisible ? 'text' : 'password'} name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} data-error={field.state.meta.isValid ? false : true} placeholder="Password" className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" />
              {!field.state.meta.isValid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <Lock className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
              <Button onClick={handlePasswordClick} type="button" className="w-4 h-4 absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">{isPasswordVisible ? <EyeOff className="w-4 h-4 stroke-zinc-300" /> : <Eye className="w-4 h-4 stroke-zinc-300" />}</Button>
            </Field>
          }
        </form.Field>
        <form.Field name="role" validators={{ onChange: CreateAuthSchema.shape.role }}>
          {field =>
            <Field className="block relative">
              <Listbox value={field.state.value} onChange={e => field.handleChange( e )}>
                <ListboxButton className="peer w-full p-4 pl-11 text-left rounded-xl dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 data-[error=true]:outline-rose-500">{String( field.state.value ) }</ListboxButton>
                <ListboxOptions anchor="bottom" className="w-(--button-width) p-1 z-10 bg-white dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-800/50 transition duration-300 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
                  <ListboxOption value="DOCTOR" className="w-full px-3 py-2 flex items-center gap-2 rounded-md cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-950">DOCTOR</ListboxOption>
                  <ListboxOption value="PHARMACIST" className="w-full px-3 py-2 flex items-center gap-2 rounded-md cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-950">PHARMACIST</ListboxOption>
                  <ListboxOption value="NURSE" className="w-full px-3 py-2 flex items-center gap-2 rounded-md cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-950">NURSE</ListboxOption>
                </ListboxOptions>
              </Listbox>
              {!field.state.meta.isValid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <User className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
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
        {!canSubmit ?
          <p className=" text-red-600">{getErrorMessages().join( ', ' )}</p> :
          <p>Lorem ipsum dolor sit amet</p>
        }
      </div>
    </form>
  );
};

export default CreateEmployeeForm;
