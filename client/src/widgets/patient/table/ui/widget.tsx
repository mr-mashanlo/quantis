import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { useSearchParams } from 'react-router';

import { type Patient, usePatients } from '@/entities/patient';
import { ArchivePatientForm, CreatePatientForm, UpdatePatientForm } from '@/features/patient';
import { Button, SquareButton } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { Menu } from '@/shared/ui/menu';
import { Header, Pagination, SearchForm, Table, TableSkeleton } from '@/shared/ui/table';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
interface ExtendedPatient extends Patient { action?: string };

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

const RowMenu = ( { row }: { row: Patient } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );
  const [ isArchiveModalOpen, setIsArchiveModalOpen ] = useState( false );

  return (
    <>
      <Menu buttons={[
        <Button scale="sm" theme="sm" onClick={() => setIsEditModalOpen( true )}>Edit</Button>,
        <Button scale="sm" theme="sm" onClick={() => setIsArchiveModalOpen( true )}>{row.archived ? 'Unarchive' : 'Archive'}</Button>
      ]} />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )}>
        <UpdatePatientForm patient={row} />
      </Dialog>
      <Dialog open={isArchiveModalOpen} onClose={() => setIsArchiveModalOpen( false )}>
        <ArchivePatientForm patient={row} />
      </Dialog>
    </>
  );
};

export const PatientTable: FC<Props> = ( props ) => {
  const [ searchParams ] = useSearchParams();
  const { patients } = usePatients( Object.fromEntries( searchParams.entries() ) );

  if ( patients.isPending ) return <TableSkeleton />;

  if ( patients.isError ) return <TableSkeleton />;

  return (
    <Table<ExtendedPatient>
      data={patients.data}
      columns={[ { key: 'action', value: 'Action', cell: row => <RowMenu row={row} /> }, { key: 'name', value: 'Name' }, { key: 'archived', value: 'Archived' } ]}
      header={<Header leftAction={<HeaderModal />} rightAction={<SearchForm />}>Patients</Header>}
      footer={<Pagination limit={patients.data.limit} page={patients.data.page} total={patients.data.total} />}
      {...props}
    />
  );
};

export default PatientTable;
