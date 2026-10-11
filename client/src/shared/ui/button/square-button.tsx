import { Button, type ButtonProps } from '@headlessui/react';
import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonProps {
  theme?: 'base' | 'light' | 'transparent'
}

const themeLibrary = {
  base: 'bg-black dark:bg-white text-white dark:text-black',
  light: 'bg-zinc-200/50 dark:bg-zinc-900',
  transparent: 'hover:bg-zinc-200/50 dark:hover:bg-zinc-900'
};

export const SquareButton: FC<Props> = ( { theme = 'base', children, className, ...props } ) => {
  return (
    <Button className={twMerge( 'w-7.5 h-7.5 flex items-center justify-center shrink-0 text-center rounded-md cursor-pointer', themeLibrary[theme], String( className ) )} {...props}>
      {children}
    </Button>
  );
};

export default SquareButton;
