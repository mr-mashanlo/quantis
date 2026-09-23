import { type RouteObject } from 'react-router';

import HomePage from '../ui/page';

export const homeRouter: RouteObject = {
  index: true,
  element: <HomePage />,
  hydrateFallbackElement: <div className="w-screen h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-0 left-0 z-40" />
};