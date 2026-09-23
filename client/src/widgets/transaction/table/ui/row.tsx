import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react';

import { type Transaction } from '@/entities/transaction';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {
  transaction: Transaction
}

const Row: FC<Props> = ( { transaction } ) => {
  return (
    <tr className="border-t border-zinc-200 dark:border-zinc-800/50">
      <td className="w-13.5 h-13.5 p-3"></td>
      <td className="p-3">{transaction.type}</td>
      <td className="p-3">{transaction.medication.name}</td>
      <td className="p-3">{transaction.amount}</td>
      <td className="p-3">{transaction.createdAt}</td>
    </tr>
  );
};

export default Row;
