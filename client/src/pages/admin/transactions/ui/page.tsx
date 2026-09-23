import { type FC } from 'react';

import { TransactionTable } from '@/widgets/transaction/table';

export const TransactionsPage: FC = () => {
  return (
    <>
      <title>Transactions</title>
      <meta property="og:title" content="Transactions" />
      <meta name="description" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="/image.svg" />
      <meta property="og:site_name" content="Quantis" />
      <meta property="twitter:card" content="summary" />

      <TransactionTable />
    </>
  );
};

export default TransactionsPage;