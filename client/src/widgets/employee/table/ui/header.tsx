import { Dialog, DialogPanel } from '@headlessui/react';
import { Plus } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';

import { CreateEmployeeForm } from '@/features/employee/create-form';

import SearchForm from './search-form';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Header: FC<Props> = () => {
  const [ isCreateModalOpen, setIsCreateModalOpen ] = useState( false );

  return (
    <div className="flex items-center">
      <div className="w-13.5 h-13.5 p-3">
        <button onClick={() => setIsCreateModalOpen( true )} className="w-7.5 h-7.5 shrink-0 flex items-center justify-center text-center bg-zinc-200/50 dark:bg-zinc-900 rounded-md cursor-pointer">
          <Plus className="w-2.5 h-2.5 stroke-3" />
        </button>
        <Dialog open={isCreateModalOpen} onClose={() => setIsCreateModalOpen( false )} className="relative z-10 focus:outline-none">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="min-h-full p-4 bg-black/10 flex items-center justify-center">
              <DialogPanel transition className="w-4xl h-140 p-4 flex items-center justify-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/50 rounded-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                <CreateEmployeeForm />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
      <div className="p-3 grow">
        <h2 className="font-bold">Employees</h2>
      </div>
      <div className="p-3">
        <SearchForm />
      </div>
    </div>
  );
};

export default Header;
