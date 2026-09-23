import { type FC } from 'react';

import { SignUpForm } from '@/features/auth/sign-up-form';

export const SignUpPage: FC = () => {
  return (
    <>
      <title>Sign up</title>
      <meta property="og:title" content="Sign up" />
      <meta name="description" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="/image.svg" />
      <meta property="og:site_name" content="Quantis" />
      <meta property="twitter:card" content="summary" />

      <section className="h-screen p-4 sm:p-15 flex justify-center items-center">
        <SignUpForm />
      </section>
    </>
  );
};

export default SignUpPage;