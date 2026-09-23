import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVertical } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { type Patient } from '@/entities/patient';
import { ArchivePatientForm } from '@/features/patient/archive-form';
import { UpdatePatientForm } from '@/features/patient/update-form';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {
  patient: Patient
}

const Row: FC<Props> = ( { patient } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );
  const [ isArchiveModalOpen, setIsArchiveModalOpen ] = useState( false );

  return (
    <tr className="border-t border-zinc-200 dark:border-zinc-800/50">
      <td className="p-3">
        <Menu>
          <MenuButton className="w-7.5 h-7.5 shrink-0 flex items-center justify-center text-center rounded-md cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-900">
            <EllipsisVertical className="w-4 h-3" />
          </MenuButton>
          <MenuItems transition anchor="bottom start" className="w-50 p-1 bg-white dark:bg-zinc-950 rounded-md border border-zinc-200 dark:border-zinc-800/50 transition duration-300 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
            <MenuItem>
              <button onClick={() => setIsEditModalOpen( true )} className="w-full px-3 py-1.5 flex items-center gap-2 rounded-md cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-900">Edit</button>
            </MenuItem>
            <MenuItem>
              <button onClick={() => setIsArchiveModalOpen( true )} className="w-full px-3 py-1.5 flex items-center gap-2 rounded-md cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-900">{patient.archived ? 'Unarchive' : 'Archive'}</button>
            </MenuItem>
          </MenuItems>
        </Menu>
        <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )} className="relative z-10 focus:outline-none">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="min-h-full p-4 bg-black/10 flex items-center justify-center">
              <DialogPanel transition className="w-4xl h-140 p-4 flex items-center justify-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/50 rounded-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                <UpdatePatientForm patient={patient} />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
        <Dialog open={isArchiveModalOpen} onClose={() => setIsArchiveModalOpen( false )} className="relative z-10 focus:outline-none">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="min-h-full p-4 bg-black/10 flex items-center justify-center">
              <DialogPanel transition className="w-4xl h-140 p-4 flex items-center justify-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/50 rounded-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                <ArchivePatientForm patient={patient} />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </td>
      <td className={twMerge( 'p-3', patient.archived ? 'opacity-30' : '' )}>{patient.name}</td>
      <td className={twMerge( 'p-3', patient.archived ? 'opacity-30' : '' )}>{String( patient.archived ).toUpperCase()}</td>
    </tr>
  );
};

export default Row;
