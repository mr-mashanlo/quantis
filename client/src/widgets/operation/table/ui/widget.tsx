import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import { type Operation, useOperations } from '@/entities/operation';
import { DepartmentToDepartmentForm, DepartmentToPatientForm } from '@/features/operation/create-form';
import { UpdateOperationForm } from '@/features/operation/update-form';
import { SmallButton, SquareButton } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { Menu } from '@/shared/ui/menu';
import { Header, Pagination, Table, TableSkeleton } from '@/shared/ui/table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const HeaderModal = () => {
  const [ isCreateDtDModalOpen, setIsCreateDtDModalOpen ] = useState( false );
  const [ isCreateDtPModalOpen, setIsCreateDtPModalOpen ] = useState( false );

  return (
    <>
      <SquareButton onClick={() => setIsCreateDtDModalOpen( true )}>
        <Plus className="w-2.5 h-2.5 stroke-3" />
      </SquareButton>
      <Dialog open={isCreateDtDModalOpen} onClose={() => setIsCreateDtDModalOpen( false )}>
        <DepartmentToDepartmentForm description={<button className="hover:underline" onClick={() => { setIsCreateDtDModalOpen( false ); setIsCreateDtPModalOpen( true ); }}>Department to Patient</button>} />
      </Dialog>
      <Dialog open={isCreateDtPModalOpen} onClose={() => setIsCreateDtPModalOpen( false )}>
        <DepartmentToPatientForm description={<button className="hover:underline" onClick={() => { setIsCreateDtDModalOpen( true ); setIsCreateDtPModalOpen( false ); }}>Department to Department</button>} />
      </Dialog>
    </>
  );
};

const ItemMenu = ( { operation }: { operation: Operation } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );

  return (
    <>
      <Menu buttons={[
        <SmallButton onClick={() => setIsEditModalOpen( true )}>Edit</SmallButton>
      ]} />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )}>
        <UpdateOperationForm operation={operation} />
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
    <Table<Operation>
      data={operations.data}
      columns={[ { key: 'status', value: 'Status', cell: row => <Link to={`/operations/${row.id}`} className="hover:underline">{row.status}</Link> }, { key: 'fromDepartmentId', value: 'From', cell: row => row.fromDepartment.name }, { key: 'toDepartmentId', value: 'To', cell: row => row.toDepartmentId ? row.toDepartment.name : row.toPatient.name }, { key: 'createdAt', value: 'Created At' } ]}
      header={<Header title="Operations" button={<HeaderModal />} />}
      footer={<Pagination limit={operations.data.limit} page={operations.data.page} total={operations.data.total} />}
      rowAction={row => <ItemMenu operation={row} />}
      {...props}
    />
  );
};

export default OperationTable;
