import { type RouteObject } from 'react-router';

import DepartmentsPage from '../ui/page';

export const departmentsRouter: RouteObject = {
  path: '/departments',
  element: <DepartmentsPage />,
  hydrateFallbackElement: <div className="w-screen h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-0 left-0 z-40" />
};