import { type RouteObject } from 'react-router';

import { signInRouter } from '@/pages/auth/sign-in';
import { signUpRouter } from '@/pages/auth/sign-up';

import { ClearLayout } from '../layouts';

export const authRouter: RouteObject = {
  children: [
    {
      element: <ClearLayout />,
      children: [
        signInRouter,
        signUpRouter
      ]
    }
  ]
};