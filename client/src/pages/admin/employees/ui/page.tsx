import { type FC } from 'react';

import { EmployeeTable } from '@/widgets/employee/table';

export const EmployeesPage: FC = () => {
  return (
    <>
      <title>Employees</title>
      <meta property="og:title" content="Employees" />
      <meta name="description" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="/image.svg" />
      <meta property="og:site_name" content="Quantis" />
      <meta property="twitter:card" content="summary" />

      <EmployeeTable />
    </>
  );
};

export default EmployeesPage;