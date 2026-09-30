import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';

import { useOperation } from '@/entities/operation';
import { type Transaction, useTransactions } from '@/entities/transaction';
import { CreateTransactionForm } from '@/features/transaction';
import { SmallButton, SquareButton } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { Menu } from '@/shared/ui/menu';
import { Header, Pagination, Table, TableSkeleton } from '@/shared/ui/table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const HeaderModal = () => {
  const [ isCreateModalOpen, setIsCreateModalOpen ] = useState( false );

  return (
    <>
      <SquareButton onClick={() => setIsCreateModalOpen( true )}>
        <Plus className="w-2.5 h-2.5 stroke-3" />
      </SquareButton>
      <Dialog open={isCreateModalOpen} onClose={() => setIsCreateModalOpen( false )}>
        <CreateTransactionForm />
      </Dialog>
    </>
  );
};

const ItemMenu = ( { transaction }: { transaction: Transaction } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );

  return (
    <>
      <Menu buttons={[
        <SmallButton onClick={() => setIsEditModalOpen( true )}>Edit</SmallButton>
      ]} />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )}>
        {transaction.id}
        {/*<UpdateTransactionForm transaction={transaction} />*/}
      </Dialog>
    </>
  );
};

export const TransactionTable: FC<Props> = ( props ) => {
  const { id } = useParams();
  const [ searchParams ] = useSearchParams();
  const { operation } = useOperation( id || '' );
  const { transactions } = useTransactions( { operationId: id || '', ...Object.fromEntries( searchParams.entries() ) } );

  if ( transactions.isPending || operation.isPending ) return <TableSkeleton />;

  if ( transactions.error || operation.error ) return <TableSkeleton />;

  return (
    <Table<Transaction>
      data={transactions.data}
      columns={[ { key: 'type', value: 'Type' }, { key: 'medicationId', value: 'Medication', cell: row => row.medication.name }, { key: 'amount', value: 'Amount' }, { key: 'createdAt', value: 'Created At' } ]}
      header={<Header title={`Transactions form ${operation.data.fromDepartment.name} to ${operation.data.toDepartmentId ? operation.data.toDepartment.name : operation.data.toPatient.name} at ${operation.data.createdAt}`} button={<HeaderModal />} />}
      footer={<Pagination limit={transactions.data.limit} page={transactions.data.page} total={transactions.data.total} />}
      rowAction={row => <ItemMenu transaction={row} />}
      {...props}
    />
  );
};

export default TransactionTable;
