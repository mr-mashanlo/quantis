import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { useAuth } from '@/entities/auth';
import { mapServerErrors } from '@/shared/libs';

export const useSignUpForm = ( { onSuccess, onError }: { onSuccess?: () => void, onError?: () => void } ) => {

  const { signUp } = useAuth();

  const form = useForm( {
    defaultValues: {
      name: 'Steve',
      email: 'steve@company.com',
      password: 'steve12345'
    },

    onSubmit: async ( { value, formApi } ) => {
      try {
        await signUp( value );
        onSuccess?.();
      } catch ( error ) {
        if ( error instanceof HTTPError ) {
          const errors = await error.data;
          formApi.setErrorMap( { onChange: { fields: mapServerErrors( errors.errors ) } } );
        }
        onError?.();
      }
    }
  } );

  return form;

};