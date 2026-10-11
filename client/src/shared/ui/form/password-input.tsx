import { Button, Field, Input, type InputProps } from '@headlessui/react';
import { Eye, EyeOff, Lock, OctagonAlert } from 'lucide-react';
import { type FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends InputProps {
  scale?: 'small' | 'base'
};

export const PasswordInput: FC<Props> = ( { scale = 'base', className, invalid = true, ...props } ) => {
  const [ isPasswordVisible, setIsPasswordVisible ] = useState<boolean>( false );

  return (
    <Field className="block relative">
      <Input type={isPasswordVisible ? 'text' : 'password'} className={twMerge( 'peer w-full bg-zinc-100 dark:bg-zinc-800 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:bg-transparent data-[error=true]:outline-rose-500', scale === 'base' ? 'p-4 pl-11 rounded-xl' : 'h-7.5 p-1 pl-7 rounded-md', String( className ) )} {...props} />
      {!invalid ? <OctagonAlert className={twMerge( 'stroke-red-500 absolute top-1/2 -translate-y-1/2', scale === 'base' ? 'w-4 h-4 left-4' : 'w-3 h-3 left-2' )} aria-hidden="true" /> : <Lock className={twMerge( 'stroke-zinc-300 dark:stroke-zinc-600 peer-focus:stroke-black dark:peer-focus:stroke-zinc-400 absolute top-1/2 -translate-y-1/2', scale === 'base' ? 'w-4 h-4 left-4' : 'w-3 h-3 left-2' )} aria-hidden="true" />}
      <Button onClick={() => setIsPasswordVisible( prev => !prev )} type="button" className={twMerge( 'absolute top-1/2 -translate-y-1/2 cursor-pointer', scale === 'base' ? 'w-4 h-4 right-4' : 'w-3 h-3 right-3' )}>
        {isPasswordVisible ? <EyeOff className={twMerge( 'stroke-zinc-300', scale === 'base' ? 'w-4 h-4' : 'w-3 h-3' )} aria-hidden="true" /> : <Eye className={twMerge( 'stroke-zinc-300', scale === 'base' ? 'w-4 h-4' : 'w-3 h-3' )} aria-hidden="true" />}
      </Button>
    </Field>
  );
};

export default PasswordInput;
