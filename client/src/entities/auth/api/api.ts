import { type KyResponse } from 'ky';

import { kyInstance } from '@/shared/libs';

import { type Auth, type SignInDTO, type SignUpDTO } from '../model/schema';

class AuthService {

  createAuth = ( data: SignInDTO ): Promise<KyResponse<Auth>> => {
    return kyInstance.post( 'auth/create', { json: data } );
  };

  signIn = ( data: SignInDTO ): Promise<KyResponse<Auth>> => {
    return kyInstance.post( 'auth/signin', { json: data } );
  };

  signUp = ( data: SignUpDTO ): Promise<KyResponse<Auth>> => {
    return kyInstance.post( 'auth/signup', { json: data } );
  };

}

export const authService = new AuthService();