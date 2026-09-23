import { type RouteObject } from 'react-router';

import NotFoundPage from '../ui/page';

export const notFoundRouter: RouteObject = {
  path: '*',
  element: <NotFoundPage />
};
