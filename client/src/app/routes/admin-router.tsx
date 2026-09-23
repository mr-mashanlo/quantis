import { type RouteObject } from 'react-router';

import { departmentsRouter } from '@/pages/admin/departments';
import { employeesRouter } from '@/pages/admin/employees';
import { medicationsRouter } from '@/pages/admin/medications';
import { operationsRouter } from '@/pages/admin/operations';
import { patientsRouter } from '@/pages/admin/patients';
import { transactionsRouter } from '@/pages/admin/transactions';

import { AdminLayout } from '../layouts';

export const adminRouter: RouteObject = {
  children: [
    {
      element: <AdminLayout />,
      children: [
        departmentsRouter,
        employeesRouter,
        medicationsRouter,
        patientsRouter,
        operationsRouter,
        transactionsRouter
      ]
    }
  ]
};