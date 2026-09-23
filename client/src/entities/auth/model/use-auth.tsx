import { authService } from '../api/api';
import { type SignInDTO, type SignUpDTO } from './schema';

export const useAuth = () => {

  const signIn = ( data: SignInDTO ) => authService.signIn( data );

  const signUp = ( data: SignUpDTO ) => authService.signUp( data );

  return { signIn, signUp };

};