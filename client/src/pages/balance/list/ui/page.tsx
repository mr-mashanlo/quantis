import { type FC } from 'react';

import { BalanceTable } from '@/widgets/balance/table';

export const BalancesPage: FC = () => {
  return (
    <>
      <title>Balances</title>
      <meta property="og:title" content="Balances" />
      <meta name="description" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="/image.svg" />
      <meta property="og:site_name" content="Quantis" />
      <meta property="twitter:card" content="summary" />

      <BalanceTable />
    </>
  );
};

export default BalancesPage;
