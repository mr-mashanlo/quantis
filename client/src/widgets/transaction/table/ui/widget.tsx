import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { useOperation } from '@/entities/operation';
import { useTransactions } from '@/entities/transaction';

import Header from './header';
import Pagination from './pagination';
import Table from './table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const TransactionTable: FC<Props> = ( { className, ...props } ) => {
  const { id } = useParams();
  const [ searchParams ] = useSearchParams();
  const { operation } = useOperation( id || '' );
  const { transactions } = useTransactions( { operationId: id || '', ...Object.fromEntries( searchParams.entries() ) } );

  return (
    <div className={twMerge( 'border border-zinc-200 dark:border-zinc-800/50 rounded-md', className )} {...props}>
      <div className="border-b border-zinc-200 dark:border-zinc-800/50">
        <Header title={`Transaction from ${operation.data?.fromDepartment.name} to ${operation.data?.toDepartmentId ? operation.data?.toDepartment.name : operation.data?.toPatient.name} on ${operation.data?.createdAt}`} />
      </div>
      <div className="overflow-auto">
        <Table transactions={transactions.data?.data || []} />
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800/50">
        <Pagination limit={transactions.data?.limit || 1} page={transactions.data?.page || 1} total={transactions.data?.total || 0} />
      </div>
    </div>
  );
};

export default TransactionTable;
