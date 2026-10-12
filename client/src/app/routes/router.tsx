import { createBrowserRouter } from 'react-router';

import { authRouter } from './auth-router';
import { mainRouter } from './main-router';

export const router = createBrowserRouter( [
  {
    path: '/',
    children: [
      authRouter,
      mainRouter
    ]
  }
] );
