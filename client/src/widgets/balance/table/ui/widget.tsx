import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react';
import { useParams, useSearchParams } from 'react-router';

import { type Balance, useBalances } from '@/entities/balance';
import { useDepartment } from '@/entities/department';
import { Header, Pagination, Table, TableSkeleton } from '@/shared/ui/table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
interface ExtendedBalance extends Balance { action?: string };

export const BalanceTable: FC<Props> = ( props ) => {
  const { id } = useParams();
  const { department } = useDepartment( id || '' );
  const [ searchParams ] = useSearchParams();
  const { balances } = useBalances( { departmentId: id || '', ...Object.fromEntries( searchParams.entries() ) } );

  if ( balances.isPending || department.isPending ) return <TableSkeleton />;

  if ( balances.isError || department.isError ) return <TableSkeleton />;

  return (
    <Table<ExtendedBalance>
      data={balances.data}
      columns={[ { key: 'action', value: 'Action', cell: () => <></> }, { key: 'medicationId', value: 'Name', cell: row => row.medication.name }, { key: 'amount', value: 'Amount' } ]}
      header={<Header leftAction={<></>}>{department.data.name} department balance</Header>}
      footer={<Pagination limit={balances.data.limit} page={balances.data.page} total={balances.data.total} />}
      {...props}
    />
  );
};

export default BalanceTable;
