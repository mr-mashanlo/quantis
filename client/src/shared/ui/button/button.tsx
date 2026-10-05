import { Button as HeadlessButton, type ButtonProps } from '@headlessui/react';
import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonProps {
  scale?: 'sm' | 'base',
  theme?: 'sm' | 'base'
};

export const Button: FC<Props> = ( { scale = 'base', theme = 'base', children, className, ...props } ) => {

  const scaleLibrary = {
    sm: 'h-7.5 px-3 py-1 rounded-md',
    base: 'p-4 rounded-xl'
  };

  const themeLibrary = {
    sm: 'text-left hover:bg-zinc-200/50 dark:hover:bg-zinc-900',
    base: 'text-center bg-black dark:bg-white text-white dark:text-black'
  };

  return (
    <HeadlessButton className={twMerge( 'w-full cursor-pointer outline-offset-3 disabled:cursor-default disabled:opacity-70', scaleLibrary[scale], themeLibrary[theme], String( className ) )} {...props}>
      {children}
    </HeadlessButton>
  );
};

export default Button;
