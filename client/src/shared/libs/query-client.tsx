import { type DefaultOptions, MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';

const queryCache = new QueryCache( {
  onError: async error => {
    if ( error instanceof HTTPError ) {
      const status = error.response.status;
      if ( status === 403 ) {
        window.location.replace( '/no-access' );
      }
    }
  }
} );

const mutationCache = new MutationCache( {
  onError: async error => {
    if ( error instanceof HTTPError ) {
      const status = error.response.status;
      console.log( status );
      if ( status === 403 ) {
        window.location.replace( '/no-access' );
      }
    }
  }
} );

const defaultOptions: DefaultOptions = {
  queries: {
    retry: ( failureCount, error ) => {
      if ( error instanceof HTTPError ) {
        const status = error.response.status;
        if ( [ 401, 403, 404 ].includes( status ) ) return false;
      }
      return failureCount < 3;
    }
  }
};

export const queryClient = new QueryClient( { defaultOptions, mutationCache, queryCache } );