import { Combobox as HeadlessCombobox, ComboboxOption, ComboboxOptions, type ComboboxProps, Field } from '@headlessui/react';
import { ChevronDown, OctagonAlert } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props<T, M extends boolean> extends ComboboxProps<T, M> {
  icon: IconName,
  input: ReactNode,
  options: Array<{id: string, key: string, value: string}>,
  scale?: 'small' | 'base'
}

export const Combobox = <T, M extends boolean>( { icon, input, options, scale = 'base', invalid = true, ...props }: Props<T, M> ) => {
  return (
    <Field className="block relative">
      <HeadlessCombobox {...props}>
        {input}
        <ComboboxOptions anchor="bottom" className="w-(--input-width) p-1 z-10 bg-white dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-800/50 transition duration-300 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
          {options.map( option => <ComboboxOption key={option.id} value={option} className="w-full px-3 py-2 flex items-center gap-2 rounded-md cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-950">{option.value}</ComboboxOption> )}
        </ComboboxOptions>
      </HeadlessCombobox>
      {!invalid ? <OctagonAlert className={twMerge( 'stroke-red-500 absolute top-1/2 -translate-y-1/2', scale === 'base' ? 'w-4 h-4 left-4' : 'w-3 h-3 left-2' )} aria-hidden="true" /> : <DynamicIcon name={icon} className={twMerge( 'stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 -translate-y-1/2', scale === 'base' ? 'w-4 h-4 left-4' : 'w-3 h-3 left-2' )} aria-hidden="true" />}
      <ChevronDown className={twMerge( 'stroke-zinc-300 absolute top-1/2 -translate-y-1/2', scale === 'base' ? 'w-4 h-4 right-4' : 'w-3 h-3 right-2' )} aria-hidden="true" />
    </Field>
  );
};

export default Combobox;
