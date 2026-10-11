import { type RouteObject } from 'react-router';

import CreateOperationPage from '../ui/create-page';
import OperationsPage from '../ui/page';

export const operationsRouter: RouteObject = {
  path: '/operations',
  element: <OperationsPage />,
  hydrateFallbackElement: <div className="w-screen h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-0 left-0 z-40" />
};

export const createOperationRouter: RouteObject = {
  path: '/operations/create',
  element: <CreateOperationPage />,
  hydrateFallbackElement: <div className="w-screen h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-0 left-0 z-40" />
};
