import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { useSearchParams } from 'react-router';

import { type Medication, useMedications } from '@/entities/medication';
import { ArchiveMedicationForm, CreateMedicationForm, UpdateMedicationForm } from '@/features/medication';
import { Button, SquareButton } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { Menu } from '@/shared/ui/menu';
import { Header, Pagination, SearchForm, Table, TableSkeleton } from '@/shared/ui/table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
interface ExtendedMedication extends Medication { action?: string };

const HeaderModal = () => {
  const [ isCreateModalOpen, setIsCreateModalOpen ] = useState( false );

  return (
    <>
      <SquareButton onClick={() => setIsCreateModalOpen( true )}>
        <Plus className="w-2.5 h-2.5 stroke-3" />
      </SquareButton>
      <Dialog open={isCreateModalOpen} onClose={() => setIsCreateModalOpen( false )}>
        <CreateMedicationForm />
      </Dialog>
    </>
  );
};

const RowMenu = ( { row }: { row: Medication } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );
  const [ isArchiveModalOpen, setIsArchiveModalOpen ] = useState( false );

  return (
    <>
      <Menu buttons={[
        <Button scale="sm" theme="sm" onClick={() => setIsEditModalOpen( true )}>Edit</Button>,
        <Button scale="sm" theme="sm" onClick={() => setIsArchiveModalOpen( true )}>{row.archived ? 'Unarchive' : 'Archive'}</Button>
      ]} />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )}>
        <UpdateMedicationForm medication={row} />
      </Dialog>
      <Dialog open={isArchiveModalOpen} onClose={() => setIsArchiveModalOpen( false )}>
        <ArchiveMedicationForm medication={row} />
      </Dialog>
    </>
  );
};

export const MedicationTable: FC<Props> = ( props ) => {
  const [ searchParams ] = useSearchParams();
  const { medications } = useMedications( Object.fromEntries( searchParams.entries() ) );

  if ( medications.isPending ) return <TableSkeleton />;

  if ( medications.isError ) return <TableSkeleton />;

  return (
    <Table<ExtendedMedication>
      data={medications.data}
      columns={[ { key: 'action', value: 'Action', cell: row => <RowMenu row={row} /> }, { key: 'name', value: 'Name' }, { key: 'unit', value: 'Unit' }, { key: 'archived', value: 'Archived' } ]}
      header={<Header leftAction={<HeaderModal />} rightAction={<SearchForm />}>Medication</Header>}
      footer={<Pagination limit={medications.data.limit} page={medications.data.page} total={medications.data.total} />}
      {...props}
    />
  );
};

export default MedicationTable;
