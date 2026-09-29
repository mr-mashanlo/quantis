import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { useSearchParams } from 'react-router';

import { type Employee, useEmployees } from '@/entities/employee';
import { ArchiveEmployeeForm } from '@/features/employee/archive-form';
import { CreateEmployeeForm } from '@/features/employee/create-form';
import { UpdateEmployeeForm } from '@/features/employee/update-form';
import { SmallButton, SquareButton } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { Menu } from '@/shared/ui/menu';
import { Header, Pagination, SearchForm, Table, TableSkeleton } from '@/shared/ui/table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

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

const ItemMenu = ( { employee }: { employee: Employee } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );
  const [ isArchiveModalOpen, setIsArchiveModalOpen ] = useState( false );

  return (
    <>
      <Menu buttons={[
        <SmallButton onClick={() => setIsEditModalOpen( true )}>Edit</SmallButton>,
        <SmallButton onClick={() => setIsArchiveModalOpen( true )}>{employee.archived ? 'Unarchive' : 'Archive'}</SmallButton>
      ]} />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )}>
        <UpdateEmployeeForm employee={employee} />
      </Dialog>
      <Dialog open={isArchiveModalOpen} onClose={() => setIsArchiveModalOpen( false )}>
        <ArchiveEmployeeForm employee={employee} />
      </Dialog>
    </>
  );
};

export const EmployeeTable: FC<Props> = ( props ) => {
  const [ searchParams ] = useSearchParams();
  const { employees } = useEmployees( Object.fromEntries( searchParams.entries() ) );

  if ( employees.isPending ) return <TableSkeleton />;

  if ( employees.error ) return <TableSkeleton />;

  return (
    <Table<Employee>
      data={employees.data}
      columns={[ { key: 'name', value: 'Name' }, { key: 'role', value: 'Role' }, { key: 'archived', value: 'Archived' } ]}
      header={<Header title="Employees" button={<HeaderModal />} action={<SearchForm />} />}
      footer={<Pagination limit={employees.data.limit} page={employees.data.page} total={employees.data.total} />}
      rowAction={row => <ItemMenu employee={row} />}
      {...props}
    />
  );
};

export default EmployeeTable;
