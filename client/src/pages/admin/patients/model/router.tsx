import { type RouteObject } from 'react-router';

import PatientsPage from '../ui/page';

export const patientsRouter: RouteObject = {
  path: '/patients',
  element: <PatientsPage />,
  hydrateFallbackElement: <div className="w-screen h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-0 left-0 z-40" />
};