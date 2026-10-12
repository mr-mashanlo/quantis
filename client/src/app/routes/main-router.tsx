import { type RouteObject } from 'react-router';

import { balancesRouter } from '@/pages/balance/list';
import { departmentsRouter } from '@/pages/department/list';
import { employeesRouter } from '@/pages/employee/list';
import { homeRouter } from '@/pages/home';
import { medicationsRouter } from '@/pages/medication/list';
import { noAccessRouter } from '@/pages/no-access';
import { notFoundRouter } from '@/pages/not-found';
import { createOperationRouter } from '@/pages/operation/create';
import { operationsRouter } from '@/pages/operation/list';
import { patientsRouter } from '@/pages/patient/list';
import { transactionsRouter } from '@/pages/transaction/list';

import { AdminLayout, ClearLayout } from '../layouts';

export const mainRouter: RouteObject = {
  children: [
    {
      element: <AdminLayout />,
      children: [
        homeRouter,
        departmentsRouter,
        employeesRouter,
        medicationsRouter,
        patientsRouter,
        createOperationRouter,
        operationsRouter,
        transactionsRouter,
        balancesRouter
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
