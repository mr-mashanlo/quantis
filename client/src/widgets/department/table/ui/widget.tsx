import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { useSearchParams } from 'react-router';

import { type Department, useDepartments } from '@/entities/department';
import { ArchiveDepartmentForm } from '@/features/department/archive-form';
import { CreateDepartmentForm } from '@/features/department/create-form';
import { UpdateDepartmentForm } from '@/features/department/update-form';
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
        <CreateDepartmentForm />
      </Dialog>
    </>
  );
};

const ItemMenu = ( { department }: { department: Department } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );
  const [ isArchiveModalOpen, setIsArchiveModalOpen ] = useState( false );

  return (
    <>
      <Menu buttons={[
        <SmallButton onClick={() => setIsEditModalOpen( true )}>Edit</SmallButton>,
        <SmallButton onClick={() => setIsArchiveModalOpen( true )}>{department.archived ? 'Unarchive' : 'Archive'}</SmallButton>
      ]} />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )}>
        <UpdateDepartmentForm department={department} />
      </Dialog>
      <Dialog open={isArchiveModalOpen} onClose={() => setIsArchiveModalOpen( false )}>
        <ArchiveDepartmentForm department={department} />
      </Dialog>
    </>
  );
};

export const DepartmentTable: FC<Props> = ( props ) => {
  const [ searchParams ] = useSearchParams();
  const { departments } = useDepartments( Object.fromEntries( searchParams.entries() ) );

  if ( departments.isPending ) return <TableSkeleton />;

  if ( departments.error ) return <TableSkeleton />;

  return (
    <Table<Department>
      data={departments.data}
      columns={[ { key: 'name', value: 'Name' }, { key: 'archived', value: 'Archived' } ]}
      header={<Header title="Departments" button={<HeaderModal />} action={<SearchForm />} />}
      footer={<Pagination limit={departments.data.limit} page={departments.data.page} total={departments.data.total} />}
      rowAction={row => <ItemMenu department={row} />}
      {...props}
    />
  );
};

export default DepartmentTable;
