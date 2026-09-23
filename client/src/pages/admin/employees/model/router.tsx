import { type RouteObject } from 'react-router';

import EmployeesPage from '../ui/page';

export const employeesRouter: RouteObject = {
  path: '/employees',
  element: <EmployeesPage />,
  hydrateFallbackElement: <div className="w-screen h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-0 left-0 z-40" />
};