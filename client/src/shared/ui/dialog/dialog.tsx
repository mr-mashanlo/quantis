import { Dialog as HeadlessDialog, DialogPanel, type DialogProps } from '@headlessui/react';
import { type FC } from 'react';

type Props = DialogProps;

export const Dialog: FC<Props> = ( { children, ...props } ) => {
  return (
    <HeadlessDialog className="relative z-10 focus:outline-none" {...props}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="min-h-full p-4 bg-black/10 dark:bg-black/80 flex items-center justify-center">
          <DialogPanel transition className="w-4xl h-140 p-4 flex items-center justify-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/50 rounded-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
            {children}
          </DialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  );
};

export default Dialog;
