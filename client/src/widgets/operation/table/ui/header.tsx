import { Dialog, DialogPanel } from '@headlessui/react';
import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';

import { DepartmentToDepartmentForm, DepartmentToPatientForm } from '@/features/operation/create-form';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Header: FC<Props> = () => {
  const [ isDepartmentToDepartmentModalOpen, setIsDepartmentToDepartmentModalOpen ] = useState( false );
  const [ isDepartmentToPatientModalOpen, setIsDepartmentToPatientModalOpen ] = useState( false );

  return (
    <div className="flex items-center">
      <div className="w-13.5 h-13.5 p-3">
        <button onClick={() => setIsDepartmentToDepartmentModalOpen( true )} className="w-7.5 h-7.5 shrink-0 flex items-center justify-center text-center bg-zinc-200/50 dark:bg-zinc-900 rounded-md cursor-pointer">
          <Plus className="w-2.5 h-2.5 stroke-3" />
        </button>
        <Dialog open={isDepartmentToDepartmentModalOpen} onClose={() => setIsDepartmentToDepartmentModalOpen( false )} className="relative z-10 focus:outline-none">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="min-h-full p-4 bg-black/10 flex items-center justify-center">
              <DialogPanel transition className="w-4xl h-140 p-4 flex items-center justify-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/50 rounded-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                <DepartmentToDepartmentForm description={<a onClick={() => { setIsDepartmentToPatientModalOpen( true ); setIsDepartmentToDepartmentModalOpen( false ); }} className="cursor-pointer hover:underline">Change Department to Patient</a>} />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
        <Dialog open={isDepartmentToPatientModalOpen} onClose={() => setIsDepartmentToPatientModalOpen( false )} className="relative z-10 focus:outline-none">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="min-h-full p-4 bg-black/10 flex items-center justify-center">
              <DialogPanel transition className="w-4xl h-140 p-4 flex items-center justify-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/50 rounded-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                <DepartmentToPatientForm description={<a onClick={() => { setIsDepartmentToDepartmentModalOpen( true ); setIsDepartmentToPatientModalOpen( false ); }} className="cursor-pointer hover:underline">Change Department to Department</a>} />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
      <div className="p-3 grow">
        <h2 className="font-bold">Operations</h2>
      </div>
    </div>
  );
};

export default Header;
