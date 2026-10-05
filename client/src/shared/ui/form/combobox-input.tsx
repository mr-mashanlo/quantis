
import { ComboboxInput as HeadlessComboboxInput, type ComboboxInputProps } from '@headlessui/react';
import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ComboboxInputProps<'input', { value: string }> {
  scale?: 'sm' | 'base'
}

export const ComboboxInput: FC<Props> = ( { scale = 'base', ...props } ) => {
  return (
    <HeadlessComboboxInput className={twMerge( 'peer w-full bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500', scale === 'base' ? 'p-4 pl-11 rounded-xl' : 'h-7.5 p-1 pl-7 rounded-md' )} {...props} />
  );
};

export default ComboboxInput;