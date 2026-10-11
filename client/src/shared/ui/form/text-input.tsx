import { Field, Input, type InputProps } from '@headlessui/react';
import { OctagonAlert } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends InputProps {
  icon: IconName,
  scale?: 'small' | 'base'
}

export const TextInput: FC<Props> = ( { icon, scale = 'base', invalid = true, ...props } ) => {
  return (
    <Field className="block relative">
      <Input className={twMerge( 'peer w-full  bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500', scale === 'base' ? 'p-4 pl-11 rounded-xl' : 'h-7.5 p-1 pl-7 rounded-md' )} {...props} />
      {!invalid ? <OctagonAlert className={twMerge( 'stroke-red-500 absolute top-1/2 -translate-y-1/2', scale === 'base' ? 'w-4 h-4 left-4' : 'w-3 h-3 left-2' )} aria-hidden="true" /> : <DynamicIcon name={icon} className={twMerge( 'stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 -translate-y-1/2', scale === 'base' ? 'w-4 h-4 left-4' : 'w-3 h-3 left-2' )} aria-hidden="true" />}
    </Field>
  );
};

export default TextInput;
