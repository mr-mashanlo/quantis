import { type FC } from 'react';

import { DepartmentTable } from '@/widgets/department/table';

export const DepartmentsPage: FC = () => {
  return (
    <>
      <title>Departments</title>
      <meta property="og:title" content="Departments" />
      <meta name="description" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="/image.svg" />
      <meta property="og:site_name" content="Quantis" />
      <meta property="twitter:card" content="summary" />

      <DepartmentTable />
    </>
  );
};

export default DepartmentsPage;