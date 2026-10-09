import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { useSearchParams } from 'react-router';

import { type Employee, useEmployees } from '@/entities/employee';
import { ArchiveEmployeeForm, CreateEmployeeForm, UpdateEmployeeForm } from '@/features/employee';
import { Button, SquareButton } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { Menu } from '@/shared/ui/menu';
import { Header, Pagination, SearchForm, Table, TableSkeleton } from '@/shared/ui/table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
interface ExtendedEmployee extends Employee { action?: string };

const HeaderModal = () => {
  const [ isCreateModalOpen, setIsCreateModalOpen ] = useState( false );

  return (
    <>
      <SquareButton onClick={() => setIsCreateModalOpen( true )}>
        <Plus className="w-2.5 h-2.5 stroke-3" />
      </SquareButton>
      <Dialog open={isCreateModalOpen} onClose={() => setIsCreateModalOpen( false )}>
        <CreateEmployeeForm />
      </Dialog>
    </>
  );
};

const RowMenu = ( { row }: { row: Employee } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );
  const [ isArchiveModalOpen, setIsArchiveModalOpen ] = useState( false );

  return (
    <>
      <Menu buttons={[
        <Button scale="sm" theme="sm" onClick={() => setIsEditModalOpen( true )}>Edit</Button>,
        <Button scale="sm" theme="sm" onClick={() => setIsArchiveModalOpen( true )}>{row.archived ? 'Unarchive' : 'Archive'}</Button>
      ]} />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )}>
        <UpdateEmployeeForm employee={row} />
      </Dialog>
      <Dialog open={isArchiveModalOpen} onClose={() => setIsArchiveModalOpen( false )}>
        <ArchiveEmployeeForm employee={row} />
      </Dialog>
    </>
  );
};

export const EmployeeTable: FC<Props> = ( props ) => {
  const [ searchParams ] = useSearchParams();
  const { employees } = useEmployees( Object.fromEntries( searchParams.entries() ) );

  if ( employees.isPending ) return <TableSkeleton />;

  if ( employees.isError ) return <TableSkeleton />;

  return (
    <Table<ExtendedEmployee>
      data={employees.data}
      columns={[ { key: 'action', value: 'Action', cell: row => <RowMenu row={row} /> }, { key: 'name', value: 'Name' }, { key: 'role', value: 'Role' }, { key: 'archived', value: 'Archived' } ]}
      header={<Header leftAction={<HeaderModal />} rightAction={<SearchForm />}>Employees</Header>}
      footer={<Pagination limit={employees.data.limit} page={employees.data.page} total={employees.data.total} />}
      {...props}
    />
  );
};

export default EmployeeTable;
