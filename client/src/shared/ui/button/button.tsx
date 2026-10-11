import { Button as HeadlessButton, type ButtonProps } from '@headlessui/react';
import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonProps {
  scale?: 'base' | 'small',
  theme?: 'base' | 'light' | 'transparent'
};

const scaleLibrary = {
  base: 'p-4 rounded-xl',
  small: 'h-7.5 px-3 py-1 rounded-md'
};

const themeLibrary = {
  base: 'bg-black dark:bg-white text-white dark:text-black',
  light: 'bg-zinc-200/50 dark:bg-zinc-900',
  transparent: 'hover:bg-zinc-200/50 dark:hover:bg-zinc-900'
};

export const Button: FC<Props> = ( { scale = 'base', theme = 'base', children, className, ...props } ) => {
  return (
    <HeadlessButton className={twMerge( 'w-full text-center cursor-pointer outline-offset-3 disabled:cursor-default disabled:opacity-70', scaleLibrary[scale], themeLibrary[theme], String( className ) )} {...props}>
      {children}
    </HeadlessButton>
  );
};

export default Button;
