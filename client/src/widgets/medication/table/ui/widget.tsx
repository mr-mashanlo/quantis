import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { useSearchParams } from 'react-router';

import { type Medication, useMedications } from '@/entities/medication';
import { ArchiveMedicationForm, CreateMedicationForm, UpdateMedicationForm } from '@/features/medication';
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
        <CreateMedicationForm />
      </Dialog>
    </>
  );
};

const ItemMenu = ( { medication }: { medication: Medication } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );
  const [ isArchiveModalOpen, setIsArchiveModalOpen ] = useState( false );

  return (
    <>
      <Menu buttons={[
        <SmallButton onClick={() => setIsEditModalOpen( true )}>Edit</SmallButton>,
        <SmallButton onClick={() => setIsArchiveModalOpen( true )}>{medication.archived ? 'Unarchive' : 'Archive'}</SmallButton>
      ]} />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )}>
        <UpdateMedicationForm medication={medication} />
      </Dialog>
      <Dialog open={isArchiveModalOpen} onClose={() => setIsArchiveModalOpen( false )}>
        <ArchiveMedicationForm medication={medication} />
      </Dialog>
    </>
  );
};

export const MedicationTable: FC<Props> = ( props ) => {
  const [ searchParams ] = useSearchParams();
  const { medications } = useMedications( Object.fromEntries( searchParams.entries() ) );

  if ( medications.isPending ) return <TableSkeleton />;

  if ( medications.error ) return <TableSkeleton />;

  return (
    <Table<Medication>
      data={medications.data}
      columns={[ { key: 'name', value: 'Name' }, { key: 'archived', value: 'Archived' } ]}
      header={<Header title="Medication" button={<HeaderModal />} action={<SearchForm />} />}
      footer={<Pagination limit={medications.data.limit} page={medications.data.page} total={medications.data.total} />}
      rowAction={row => <ItemMenu medication={row} />}
      {...props}
    />
  );
};

export default MedicationTable;
