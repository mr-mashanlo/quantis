import { useForm } from '@tanstack/react-form';
import { HTTPError } from 'ky';

import { useAuth } from '@/entities/auth';
import { mapServerErrors } from '@/shared/libs';

export const useSignInForm = ( { onSuccess, onError }: { onSuccess?: () => void, onError?: () => void } ) => {

  const { signIn } = useAuth();

  const form = useForm( {
    defaultValues: {
      email: 'steve@company.com',
      password: 'steve12345'
    },

    onSubmit: async ( { value, formApi } ) => {
      try {
        await signIn( value );
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