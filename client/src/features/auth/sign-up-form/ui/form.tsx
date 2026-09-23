import { Button, Field, Fieldset, Input, Legend } from '@headlessui/react';
import { useSelector } from '@tanstack/react-form';
import { AtSign, Eye, EyeOff, Lock, OctagonAlert, User } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { SignUpSchema } from '@/entities/auth';

import { useSignUpForm } from '../model/hook';

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export const SignUpForm: FC<Props> = ( { className, ...others } ) => {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const form = useSignUpForm( { onSuccess: () => navigate( searchParams.get( 'from' ) ? `/${searchParams.get( 'from' )}` : '/', { replace: true } ) } );
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
    return Object.values( fieldMeta ).filter( field => field.errors.length ).map( field => field.errors.map( item => item.message ) );
  };

  return (
    <form onSubmit={handleFormSubmit} className={twMerge( 'w-full sm:w-90 relative', className )} {...others}>
      <Fieldset>
        <Legend className="mb-5 text-xl text-center font-bold">Sign up</Legend>
        <div className="grid gap-4 sm:gap-5">
          <form.Field name="name" validators={{ onChange: SignUpSchema.shape.name }}>
            {field =>
              <Field className="block relative">
                <Input type="text" name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} data-error={field.state.meta.isValid ? false : true} placeholder="Name" className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" />
                {!field.state.meta.isValid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <User className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
              </Field>
            }
          </form.Field>
          <form.Field name="email" validators={{ onChange: SignUpSchema.shape.email }}>
            {field =>
              <Field className="block relative">
                <Input type="email" name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} data-error={field.state.meta.isValid ? false : true} placeholder="email@company.com" className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" />
                {!field.state.meta.isValid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <AtSign className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
              </Field>
            }
          </form.Field>
          <form.Field name="password" validators={{ onChange: SignUpSchema.shape.password }}>
            {field =>
              <Field className="block relative">
                <Input type={isPasswordVisible ? 'text' : 'password'} name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} data-error={field.state.meta.isValid ? false : true} placeholder="•••••••••" className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" />
                {!field.state.meta.isValid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <Lock className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
                <Button onClick={handlePasswordClick} type="button" className="w-4 h-4 absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">{isPasswordVisible ? <EyeOff className="w-4 h-4 stroke-zinc-300" /> : <Eye className="w-4 h-4 stroke-zinc-300" />}</Button>
              </Field>
            }
          </form.Field>
          <form.Subscribe selector={state => [ state.canSubmit, state.isSubmitting ]}>
            {( [ canSubmit, isSubmitting ] ) =>
              <Button disabled={!canSubmit} type="submit" className="w-full p-4 rounded-xl bg-black dark:bg-white text-white dark:text-black cursor-pointer outline-offset-3 disabled:cursor-default disabled:opacity-70">{isSubmitting ? '•••' : 'Sign up'}</Button>
            }
          </form.Subscribe>
        </div>
      </Fieldset>
      <div className="w-full mt-5 text-center absolute top-full">
        {!canSubmit ?
          <p className="text-red-600">{getErrorMessages().join( ', ' )}</p> :
          <p>Already have an account? <Link to={`/signin?${searchParams.toString()}`} className="font-bold decoration-[.1rem] hover:underline">Log in</Link></p>
        }
      </div>
    </form>
  );
};

export default SignUpForm;