
import { ComboboxInput as HeadlessComboboxInput, type ComboboxInputProps } from '@headlessui/react';
import { type FC } from 'react';

type Props = ComboboxInputProps<'input', { value: string }>;

export const ComboboxInput: FC<Props> = ( props ) => {
  return (
    <HeadlessComboboxInput className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" {...props} />
  );
};

export default ComboboxInput;