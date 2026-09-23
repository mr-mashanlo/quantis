import { type FC } from 'react';

import { SignInForm } from '@/features/auth/sign-in-form';

export const SignInPage: FC = () => {
  return (
    <>
      <title>Sign in</title>
      <meta property="og:title" content="Sign in" />
      <meta name="description" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="/image.svg" />
      <meta property="og:site_name" content="Quantis" />
      <meta property="twitter:card" content="summary" />

      <section className="h-screen p-4 sm:p-15 flex justify-center items-center">
        <SignInForm />
      </section>
    </>
  );
};

export default SignInPage;