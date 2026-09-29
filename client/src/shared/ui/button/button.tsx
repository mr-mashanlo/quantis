import { Button as HeadlessButton, type ButtonProps } from '@headlessui/react';
import { type FC } from 'react';

type Props = ButtonProps;

export const Button: FC<Props> = ( { children, ...props } ) => {
  return (
    <HeadlessButton className="w-full p-4 rounded-xl bg-black dark:bg-white text-white dark:text-black cursor-pointer outline-offset-3 disabled:cursor-default disabled:opacity-70" {...props}>
      {children}
    </HeadlessButton>
  );
};

export default Button;
