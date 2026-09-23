import { type RouteObject } from 'react-router';

import { homeRouter } from '@/pages/main/home';
import { noAccessRouter } from '@/pages/main/no-access';
import { notFoundRouter } from '@/pages/main/not-found';

import { AdminLayout, ClearLayout } from '../layouts';

export const mainRouter: RouteObject = {
  children: [
    {
      element: <AdminLayout />,
      children: [
        homeRouter
      ]
    },
    {
      element: <ClearLayout />,
      children: [
        noAccessRouter,
        notFoundRouter
      ]
    }
  ]
};