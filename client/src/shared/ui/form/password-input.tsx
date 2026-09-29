import { Button, Field, Input, type InputProps } from '@headlessui/react';
import { Eye, EyeOff, Lock, OctagonAlert } from 'lucide-react';
import { type FC, useState } from 'react';

type Props = InputProps;

export const PasswordInput: FC<Props> = ( { invalid, ...props } ) => {
  const [ isPasswordVisible, setIsPasswordVisible ] = useState<boolean>( false );

  return (
    <Field className="block relative">
      <Input type={isPasswordVisible ? 'text' : 'password'} className="peer w-full p-4 pl-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500" {...props} />
      {!invalid ? <OctagonAlert className="w-4 h-4 stroke-red-500 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" /> : <Lock className="w-4 h-4 stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 left-4 -translate-y-1/2" aria-hidden="true" />}
      <Button onClick={() => setIsPasswordVisible( prev => !prev )} type="button" className="w-4 h-4 absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">{isPasswordVisible ? <EyeOff className="w-4 h-4 stroke-zinc-300" /> : <Eye className="w-4 h-4 stroke-zinc-300" />}</Button>
    </Field>
  );
};

export default PasswordInput;