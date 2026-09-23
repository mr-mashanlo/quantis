import { type FC } from 'react';

import { MedicationTable } from '@/widgets/medication/table';

export const MedicationsPage: FC = () => {
  return (
    <>
      <title>Medications</title>
      <meta property="og:title" content="Medications" />
      <meta name="description" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="/image.svg" />
      <meta property="og:site_name" content="Quantis" />
      <meta property="twitter:card" content="summary" />

      <MedicationTable />
    </>
  );
};

export default MedicationsPage;