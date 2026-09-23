import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVertical } from 'lucide-react';
import { type DetailedHTMLProps, type FC, type HTMLAttributes, useState } from 'react';
import { Link } from 'react-router';

import { type Operation } from '@/entities/operation';
import { UpdateOperationForm } from '@/features/operation/update-form';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {
  operation: Operation
}

const Row: FC<Props> = ( { operation } ) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );

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
          </MenuItems>
        </Menu>
        <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen( false )} className="relative z-10 focus:outline-none">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="min-h-full p-4 bg-black/10 flex items-center justify-center">
              <DialogPanel transition className="w-4xl h-140 p-4 flex items-center justify-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/50 rounded-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                <UpdateOperationForm operation={operation} />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </td>
      <td className="p-3"><Link to={`/operations/${operation.id}`} className="hover:underline">{operation.status}</Link></td>
      <td className="p-3">{operation.fromDepartment.name}</td>
      <td className="p-3">{operation.toDepartmentId ? operation.toDepartment.name : operation.toPatient.name}</td>
      <td className="p-3">{operation.createdAt}</td>
    </tr>
  );
};

export default Row;
