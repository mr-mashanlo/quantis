import { type FC } from 'react';

import { PatientTable } from '@/widgets/patient/table';

export const PatientsPage: FC = () => {
  return (
    <>
      <title>Patients</title>
      <meta property="og:title" content="Patients" />
      <meta name="description" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="/image.svg" />
      <meta property="og:site_name" content="Quantis" />
      <meta property="twitter:card" content="summary" />

      <PatientTable />
    </>
  );
};

export default PatientsPage;