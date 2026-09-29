import { Field, Input, type InputProps } from '@headlessui/react';
import { OctagonAlert } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { type FC } from 'react';

interface Props extends InputProps {
  icon: IconName
}

export const TextInput: FC<Props> = ( { icon, invalid, ...props } ) => {
  return (
    <Field className="block relative">
      <Input className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" {...props} />
      {!invalid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <DynamicIcon name={icon} className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
    </Field>
  );
};

export default TextInput;