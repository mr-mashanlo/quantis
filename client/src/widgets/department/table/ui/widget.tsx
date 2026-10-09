import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import { type Department, useDepartments } from '@/entities/department';
import { ArchiveDepartmentForm, CreateDepartmentForm, UpdateDepartmentForm } from '@/features/department';
import { Button, SquareButton } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { Menu } from '@/shared/ui/menu';
import { Header, Pagination, SearchForm, Table, TableSkeleton } from '@/shared/ui/table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
interface ExtendedDepartment extends Department { action?: string };

const HeaderModal = () => {
  const [ isCreateModalOpen, setIsCreateModalOpen ] = useState( false );

  return (
    <>
      <SquareButton onClick={() => setIsCreateModalOpen( true )}>
        <Plus className="w-2.5 h-2.5 stroke-3" />
      </SquareButton>
      <Dialog open={isCreateModalOpen} onClose={() => setIsCreateModalOpen( false )}>
        <CreateDepartmentForm />
      </Dialog>
    </>
  );
};

const RowMenu = ( { row }: { row: Department } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );
  const [ isArchiveModalOpen, setIsArchiveModalOpen ] = useState( false );

  return (
    <>
      <Menu buttons={[
        <Button scale="sm" theme="sm" onClick={() => setIsEditModalOpen( true )}>Edit</Button>,
        <Button scale="sm" theme="sm" onClick={() => setIsArchiveModalOpen( true )}>{row.archived ? 'Unarchive' : 'Archive'}</Button>
      ]} />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )}>
        <UpdateDepartmentForm department={row} />
      </Dialog>
      <Dialog open={isArchiveModalOpen} onClose={() => setIsArchiveModalOpen( false )}>
        <ArchiveDepartmentForm department={row} />
      </Dialog>
    </>
  );
};

export const DepartmentTable: FC<Props> = ( props ) => {
  const [ searchParams ] = useSearchParams();
  const { departments } = useDepartments( Object.fromEntries( searchParams.entries() ) );

  if ( departments.isPending ) return <TableSkeleton />;

  if ( departments.isError ) return <TableSkeleton />;

  return (
    <Table<ExtendedDepartment>
      data={departments.data}
      columns={[ { key: 'action', value: 'Action', cell: row => <RowMenu row={row} /> }, { key: 'name', value: 'Name', cell: row => <Link to={`/departments/${row.id}`} className="hover:underline">{row.name}</Link> }, { key: 'archived', value: 'Archived' } ]}
      header={<Header leftAction={<HeaderModal />} rightAction={<SearchForm />}>Departments</Header>}
      footer={<Pagination limit={departments.data.limit} page={departments.data.page} total={departments.data.total} />}
      {...props}
    />
  );
};

export default DepartmentTable;
