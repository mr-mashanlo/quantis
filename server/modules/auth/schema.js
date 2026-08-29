import { z } from 'zod';

export const SignInSchema = z.object( {
  email: z.email( { error: 'Email has invalid format' } ),
  password: z.string().min( 8, 'Password must be ≥ 8 characters' )
} );

export const SignUpSchema = SignInSchema.extend( {
  name: z.string().min( 3, 'Name must be ≥ 3 characters' )
} );

export const CreateUserSchema = SignUpSchema.extend( {
  role: z.enum( [ 'ADMIN', 'DOCTOR', 'PHARMACIST', 'NURSE' ], 'Role has invalid value' )
} );
