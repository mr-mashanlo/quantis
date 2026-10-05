import { Button as HeadlessButton, type ButtonProps } from '@headlessui/react';
import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonProps {
  scale?: 'sm' | 'base'
};

export const Button: FC<Props> = ( { scale = 'base', children, className, ...props } ) => {
  return (
    <HeadlessButton className={twMerge( 'w-full bg-black dark:bg-white text-white dark:text-black cursor-pointer outline-offset-3 disabled:cursor-default disabled:opacity-70', scale === 'base' ? 'p-4 rounded-xl' : 'h-7.5 px-3 py-1 rounded-md', String( className ) )} {...props}>
      {children}
    </HeadlessButton>
  );
};

export default Button;
