import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react';
import { useParams, useSearchParams } from 'react-router';

import { useOperation } from '@/entities/operation';
import { type Transaction, useTransactions } from '@/entities/transaction';
import { Header, Pagination, Table, TableSkeleton } from '@/shared/ui/table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
interface ExtendedTransaction extends Transaction { action?: string };

export const TransactionTable: FC<Props> = props => {
  const { id } = useParams();
  const [ searchParams ] = useSearchParams();
  const { operation } = useOperation( id || '' );
  const { transactions } = useTransactions( { operationId: id || '', ...Object.fromEntries( searchParams.entries() ) } );

  if ( transactions.isPending || operation.isPending ) return <TableSkeleton />;

  if ( transactions.isError || operation.isError ) return <TableSkeleton />;

  return (
    <Table<ExtendedTransaction>
      data={transactions.data}
      columns={[ { key: 'action', value: 'Action', cell: () => <></> }, { key: 'type', value: 'Type' }, { key: 'medicationId', value: 'Medication', cell: row => row.medication.name }, { key: 'amount', value: 'Amount' }, { key: 'createdAt', value: 'Created At' } ]}
      header={<Header leftAction={<></>}>Transactions form {operation.data.fromDepartment.name} to {operation.data.toDepartmentId ? operation.data.toDepartment.name : operation.data.toPatient.name} at {operation.data.createdAt}</Header>}
      footer={<Pagination limit={transactions.data.limit} page={transactions.data.page} total={transactions.data.total} />}
      {...props}
    />
  );
};

export default TransactionTable;
