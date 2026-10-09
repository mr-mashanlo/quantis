import { type RouteObject } from 'react-router';

import BalancesPage from '../ui/page';

export const balancesRouter: RouteObject = {
  path: '/departments/:id',
  element: <BalancesPage />,
  hydrateFallbackElement: <div className="w-screen h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-0 left-0 z-40" />
};