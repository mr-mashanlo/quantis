import { z } from 'zod';

export const AuthSchema = z.object( {
  id: z.string()
} );

export const SignInSchema = z.object( {
  email: z.email( 'Email has invalid format' ),
  password: z.string().min( 8, 'Password must be ≥ 8 characters' )
} );

export const SignUpSchema = SignInSchema.extend( {
  name: z.string().min( 3, 'Name must be ≥ 3 characters' )
} );

export const CreateAuthSchema = SignUpSchema.extend( {
  role: z.enum( [ 'ADMIN', 'DOCTOR', 'PHARMACIST', 'NURSE' ], 'Role has invalid value' )
} );

export type Auth = z.infer<typeof AuthSchema>;

export type SignInDTO = z.infer<typeof SignInSchema>;

export type SignUpDTO = z.infer<typeof SignUpSchema>;

export type CreateAuthDTO = z.infer<typeof CreateAuthSchema>;