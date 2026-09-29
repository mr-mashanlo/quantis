import { Field, Listbox as HeadlessListbox, ListboxButton, ListboxOption, ListboxOptions, type ListboxProps } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { type FC } from 'react';

interface Props extends ListboxProps {
  icon: IconName,
  placeholder: string,
  options: Array<{key: string, value: string}>
}

export const Listbox: FC<Props> = ( { icon, placeholder, options, ...props } ) => {
  return (
    <Field className="block relative">
      <HeadlessListbox {...props}>
        <ListboxButton className="peer w-full p-4 pl-11 text-left rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 data-[error=true]:outline-rose-500">{placeholder}</ListboxButton>
        <ListboxOptions anchor="bottom" className="w-(--button-width) p-1 z-10 bg-white dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-800/50 transition duration-300 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0">
          {options.map( option => <ListboxOption key={option.key} value={option.key} className="w-full px-3 py-2 flex items-center gap-2 rounded-md cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-950">{option.value}</ListboxOption> )}
        </ListboxOptions>
      </HeadlessListbox>
      <DynamicIcon name={icon} className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />
      <ChevronDown className="w-4 h-4 stroke-zinc-300 absolute top-1/2 right-4 -translate-y-1/2" />
    </Field>
  );
};

export default Listbox;
