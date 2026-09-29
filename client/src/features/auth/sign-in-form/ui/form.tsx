import { useSelector } from '@tanstack/react-form';
import { type DetailedHTMLProps, type FC, type FormHTMLAttributes, type SubmitEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { SignInSchema } from '@/entities/auth';
import { Button } from '@/shared/ui/button';
import { PasswordInput, TextInput } from '@/shared/ui/form';

import { useSignInForm } from '../model/hook';

type Props = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export const SignInForm: FC<Props> = ( { className, ...others } ) => {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const form = useSignInForm( { onSuccess: () => navigate( searchParams.get( 'from' ) ? `/${searchParams.get( 'from' )}` : '/', { replace: true } ) } );
  const { canSubmit, fieldMeta } = useSelector( form.store, state => state );

  const handleFormSubmit = ( e: SubmitEvent<HTMLFormElement> ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const getErrorMessages = () => {
    return Object.values( fieldMeta ).filter( field => field.errors.length ).map( field => field.errors.map( item => item.message ) );
  };

  return (
    <form onSubmit={handleFormSubmit} className={twMerge( 'w-full sm:w-90 relative', className )} {...others}>
      <h3 className="mb-5 text-xl text-center font-bold">Sign in</h3>
      <div className="grid gap-4 sm:gap-5">
        <form.Field name="email" validators={{ onChange: SignInSchema.shape.email }}>
          {field => <TextInput icon="at-sign" type="email" placeholder="email@company.com" name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
        </form.Field>
        <form.Field name="password" validators={{ onChange: SignInSchema.shape.password }}>
          {field => <PasswordInput placeholder="•••••••••" name={field.name} value={field.state.value} onChange={e => field.handleChange( e.target.value )} invalid={field.state.meta.isValid} data-error={field.state.meta.isValid ? false : true} />}
        </form.Field>
        <form.Subscribe selector={state => [ state.canSubmit, state.isSubmitting ]}>
          {( [ canSubmit, isSubmitting ] ) => <Button type="submit" disabled={!canSubmit} >{isSubmitting ? '•••' : 'Sign in'}</Button>}
        </form.Subscribe>
      </div>
      <div className="w-full mt-5 text-center absolute top-full">
        {!canSubmit ?
          <p className=" text-red-600">{getErrorMessages().join( ', ' )}</p> :
          <p>Don&apos;t have an account? <Link to={`/signup?${searchParams.toString()}`} className="font-bold decoration-[.1rem] hover:underline">Register</Link></p>
        }
      </div>
    </form>
  );
};

export default SignInForm;