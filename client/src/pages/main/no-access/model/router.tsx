import { type RouteObject } from 'react-router';

import NoAccessPage from '../ui/page';

export const noAccessRouter: RouteObject = {
  path: '/no-access',
  element: <NoAccessPage />
};
