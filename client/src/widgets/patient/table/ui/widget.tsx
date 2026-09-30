import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { useSearchParams } from 'react-router';

import { type Patient, usePatients } from '@/entities/patient';
import { ArchivePatientForm, CreatePatientForm, UpdatePatientForm } from '@/features/patient';
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
        <CreatePatientForm />
      </Dialog>
    </>
  );
};

const ItemMenu = ( { patient }: { patient: Patient } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );
  const [ isArchiveModalOpen, setIsArchiveModalOpen ] = useState( false );

  return (
    <>
      <Menu buttons={[
        <SmallButton onClick={() => setIsEditModalOpen( true )}>Edit</SmallButton>,
        <SmallButton onClick={() => setIsArchiveModalOpen( true )}>{patient.archived ? 'Unarchive' : 'Archive'}</SmallButton>
      ]} />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )}>
        <UpdatePatientForm patient={patient} />
      </Dialog>
      <Dialog open={isArchiveModalOpen} onClose={() => setIsArchiveModalOpen( false )}>
        <ArchivePatientForm patient={patient} />
      </Dialog>
    </>
  );
};

export const PatientTable: FC<Props> = ( props ) => {
  const [ searchParams ] = useSearchParams();
  const { patients } = usePatients( Object.fromEntries( searchParams.entries() ) );

  if ( patients.isPending ) return <TableSkeleton />;

  if ( patients.error ) return <TableSkeleton />;

  return (
    <Table<Patient>
      data={patients.data}
      columns={[ { key: 'name', value: 'Name' }, { key: 'archived', value: 'Archived' } ]}
      header={<Header title="Patients" button={<HeaderModal />} action={<SearchForm />} />}
      footer={<Pagination limit={patients.data.limit} page={patients.data.page} total={patients.data.total} />}
      rowAction={row => <ItemMenu patient={row} />}
      {...props}
    />
  );
};

export default PatientTable;
