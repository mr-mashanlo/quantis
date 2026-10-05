import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import { type Operation, useOperations } from '@/entities/operation';
import { UpdateOperationForm } from '@/features/operation';
import { Button } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { Menu } from '@/shared/ui/menu';
import { Header, Pagination, Table, TableSkeleton } from '@/shared/ui/table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
interface ExtendedOperation extends Operation { action?: string };

const HeaderButton = () => {
  return (
    <>
      <Link to="/operations/create" className="w-7.5 h-7.5 flex items-center justify-center shrink-0 text-center rounded-md  bg-zinc-200/50 dark:bg-zinc-900">
        <Plus className="w-2.5 h-2.5 stroke-3" />
      </Link>
    </>
  );
};

const RowMenu = ( { row }: { row: Operation } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );

  return (
    <>
      <Menu buttons={[
        <Button scale="sm" theme="sm" onClick={() => setIsEditModalOpen( true )}>Edit</Button>
      ]} />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )}>
        <UpdateOperationForm operation={row} />
      </Dialog>
    </>
  );
};

export const OperationTable: FC<Props> = ( props ) => {
  const [ searchParams ] = useSearchParams();
  const { operations } = useOperations( Object.fromEntries( searchParams.entries() ) );

  if ( operations.isPending ) return <TableSkeleton />;

  if ( operations.error ) return <TableSkeleton />;

  return (
    <Table<ExtendedOperation>
      data={operations.data}
      columns={[ { key: 'action', value: 'Action', cell: row => <RowMenu row={row} /> }, { key: 'status', value: 'Status', cell: row => <Link to={`/operations/${row.id}`} className="hover:underline">{row.status}</Link> }, { key: 'fromDepartmentId', value: 'From', cell: row => row.fromDepartment.name }, { key: 'toDepartmentId', value: 'To', cell: row => row.toDepartmentId ? row.toDepartment.name : row.toPatient.name }, { key: 'createdAt', value: 'Created At' } ]}
      header={<Header leftAction={<HeaderButton />}>Operations</Header>}
      footer={<Pagination limit={operations.data.limit} page={operations.data.page} total={operations.data.total} />}
      {...props}
    />
  );
};

export default OperationTable;
